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


class FeaturedProductsTests(unittest.TestCase):
    def test_selection_lifecycle_on_both_backends(self):
        for server_path in (ROOT / 'server.py', ROOT / 'asm-admin' / 'server.py'):
            with self.subTest(backend=str(server_path)):
                self.check_backend(server_path)

    def check_backend(self, server_path):
        with tempfile.TemporaryDirectory() as directory:
            previous_cwd = os.getcwd()
            try:
                os.chdir(directory)
                environment = {
                    'TURSO_DATABASE_URL': '', 'TURSO_AUTH_TOKEN': '',
                    'DB_FILE': 'asm.db', 'SUPERADMIN_USERNAME': '',
                    'SUPERADMIN_PASSWORD': '',
                }
                with patch.dict(os.environ, environment), contextlib.redirect_stdout(io.StringIO()):
                    spec = importlib.util.spec_from_file_location('featured_test_server', server_path)
                    module = importlib.util.module_from_spec(spec)
                    spec.loader.exec_module(module)
                    module.app.config['TESTING'] = True
                    module.limiter.enabled = False
                    client = module.app.test_client()
                    # Check the migration on a table created before this feature.
                    with contextlib.closing(sqlite3.connect('asm.db')) as connection, connection:
                        connection.execute("ALTER TABLE scanned_products DROP COLUMN is_featured")
                    initialize = module.db.init_db if hasattr(module, 'db') else module.init_db
                    initialize()
                    initialize()
                    product = {
                        'barcode': '0012345678905', 'product_name': 'Test Product',
                        'brand': 'Test Brand', 'ingredients_text': 'Milk, sugar',
                        'status': 'mashbuh', 'image_url': 'https://example.test/product.jpg',
                        'is_featured': True,
                    }
                    self.assertEqual(client.post('/api/scanned_products', json=product).status_code, 200)
                    self.assertEqual(client.get('/api/featured_products').json['products'], [])
                    with contextlib.closing(sqlite3.connect('asm.db')) as connection, connection:
                        product_id, selected = connection.execute(
                            "SELECT id, is_featured FROM scanned_products"
                        ).fetchone()
                    self.assertEqual(selected, 0)
                    url = f'/api/scanned_products/{product_id}'
                    with patch.object(module, 'get_user_role', return_value=None):
                        self.assertEqual(client.put(url, json={'is_featured': True}).status_code, 401)
                    with patch.object(module, 'get_user_role', return_value='admin'):
                        for invalid in ('true', 1, None):
                            self.assertEqual(client.put(url, json={'is_featured': invalid}).status_code, 400)
                        response = client.put(url, json={
                            'is_featured': True, 'admin_notes': 'Private admin note',
                            'admin_status': 'reviewed',
                        })
                        self.assertEqual(response.status_code, 200)
                        self.assertEqual(client.put('/api/scanned_products/99999', json={'is_featured': True}).status_code, 404)
                        # Other admin edits and anonymous scans must preserve selection.
                        self.assertEqual(client.put(url, json={'product_name': 'Updated'}).status_code, 200)
                        self.assertEqual(client.post('/api/scanned_products', json={**product, 'is_featured': False}).status_code, 200)
                        public = client.get('/api/featured_products').json
                        self.assertTrue(public['success'])
                        self.assertEqual(public['products'], [{
                            'barcode': product['barcode'], 'product_name': 'Updated',
                            'brand': product['brand'], 'ingredients_text': product['ingredients_text'],
                            'status': 'mashbuh', 'image_url': product['image_url'],
                        }])
                        # A new database connection still sees the selection.
                        with contextlib.closing(sqlite3.connect('asm.db')) as connection, connection:
                            self.assertEqual(connection.execute("SELECT is_featured FROM scanned_products").fetchone()[0], 1)
                        self.assertEqual(client.put(url, json={'is_featured': False}).status_code, 200)
                        self.assertEqual(client.get('/api/featured_products').json['products'], [])
                        client.put(url, json={'is_featured': True})
                        with patch.object(module, 'get_user_data', return_value={'can_delete': True}):
                            self.assertEqual(client.delete(url).status_code, 200)
                        self.assertEqual(client.get('/api/featured_products').json['products'], [])
            finally:
                os.chdir(previous_cwd)


if __name__ == '__main__':
    unittest.main()
