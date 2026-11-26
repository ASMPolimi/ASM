import contextlib
import importlib.util
import io
import os
from pathlib import Path
import sqlite3
import tempfile
import unittest
from unittest.mock import patch


ROOT = Path(__file__).resolve().parents[1]
POSTER = b'\x89PNG\r\n\x1a\nposter-test'


class EventPosterTests(unittest.TestCase):
    def test_poster_survives_backend_reload_without_local_asset(self):
        for server_path in (ROOT / 'server.py', ROOT / 'asm-admin' / 'server.py'):
            with self.subTest(backend=str(server_path)):
                self.check_backend(server_path)

    def check_backend(self, server_path):
        with tempfile.TemporaryDirectory() as directory:
            previous_cwd = os.getcwd()
            try:
                os.chdir(directory)
                with contextlib.closing(sqlite3.connect('asm.db')) as connection, connection:
                    connection.execute('''
                        CREATE TABLE events (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            title TEXT, date TEXT, desc TEXT, reg_link TEXT
                        )
                    ''')
                environment = {
                    'TURSO_DATABASE_URL': '', 'TURSO_AUTH_TOKEN': '',
                    'DB_FILE': 'asm.db', 'SUPERADMIN_USERNAME': '',
                    'SUPERADMIN_PASSWORD': '',
                }
                with patch.dict(os.environ, environment), contextlib.redirect_stdout(io.StringIO()):
                    def load_server():
                        spec = importlib.util.spec_from_file_location('poster_test_server', server_path)
                        module = importlib.util.module_from_spec(spec)
                        spec.loader.exec_module(module)
                        module.app.config['TESTING'] = True
                        module.app.root_path = directory
                        module.limiter.enabled = False
                        return module

                    module = load_server()
                    client = module.app.test_client()
                    with patch.object(module, 'get_user_role', return_value=None):
                        self.assertEqual(client.post('/api/upload').status_code, 401)
                    with patch.object(module, 'get_user_role', return_value='admin'):
                        response = client.post('/api/upload', data={
                            'file': (io.BytesIO(POSTER), 'poster.png'),
                            'filename': 'event-poster-test.png',
                        })
                        self.assertEqual(response.status_code, 200)
                        poster_path = '/' + response.json['path']
                        saved = client.post('/api/update', json={'events': [{
                            'title': 'Poster event', 'event_image': 'https://admin.example' + poster_path,
                        }]})
                        self.assertEqual(saved.status_code, 200, saved.json)
                        event_id = saved.json['events'][0]['id']
                        # Editing must preserve registration references and poster URLs.
                        edited = client.post('/api/update', json={'events': [{
                            **saved.json['events'][0], 'desc': 'Updated description',
                        }]})
                        self.assertEqual(edited.json['events'][0]['id'], event_id)
                    local_path = Path(response.json['path'])
                    if local_path.exists():
                        local_path.unlink()
                    reloaded = load_server().app.test_client()
                    image = reloaded.get(poster_path)
                    self.assertEqual(image.status_code, 200)
                    self.assertEqual(image.mimetype, 'image/png')
                    self.assertEqual(image.data, POSTER)
                    self.assertEqual(reloaded.head(poster_path).status_code, 200)
                    event = reloaded.get('/api/content').json['events'][0]
                    self.assertEqual(event['event_image'], 'https://admin.example' + poster_path)
                    # Existing repository assets still use the filesystem fallback.
                    Path('assets').mkdir(exist_ok=True)
                    Path('assets', 'legacy.png').write_bytes(POSTER)
                    with reloaded.get('/assets/legacy.png') as legacy:
                        self.assertEqual(legacy.status_code, 200)
                        self.assertEqual(legacy.data, POSTER)
                    self.assertEqual(reloaded.get('/assets/missing.png').status_code, 404)
            finally:
                os.chdir(previous_cwd)


if __name__ == '__main__':
    unittest.main()
