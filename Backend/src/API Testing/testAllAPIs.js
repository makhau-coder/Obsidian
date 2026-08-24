/**
 * ============================================================
 * Obsidian Backend - API Test Runner
 * ============================================================
 * 
 * HOW TO USE:
 *   1. Fill in the TEST DATA section below.
 *   2. Select which API groups to test using the TESTS_TO_RUN array.
 *   3. Run from the Backend folder:  node "src/API Testing/testAllAPIs.js"
 * 
 * VALID VALUES FOR TESTS_TO_RUN:
 *   'users' | 'restros' | 'menuItems' | 'orders' | 'orderedItems'
 * ============================================================
 */

const http = require('http');

// ============================================================
// ✅ SELECT WHICH API GROUPS TO TEST
// ============================================================
const TESTS_TO_RUN = [
    'users',
    'restros',
    'menuItems',
    'orders',
    'orderedItems'
];

// ============================================================
// ✅ TEST DATA — fill this before running
// ============================================================
const TEST_DATA = {
    BASE_URL: 'http://localhost:5000',

    user: {
        user_firstname: 'Test',
        user_lastname:  'Runner',
        user_gender:    'Male',
        user_role:      'CUSTOMER',
        user_email:     `testrunner.${Date.now()}@example.com`,   // unique each run
        user_phone:     '9876543210',
        user_password:  'testpass123'
    },

    restro: {
        restro_name:     'Test Kitchen',
        user_firstname:  'Restro',
        user_lastname:   'Owner',
        user_gender:     'Male',
        user_role:       'MERCHANT',
        restro_email:    `resttro.${Date.now()}@restro.com`,       // unique each run
        restro_location: '123 Test Street, Mumbai',
        restro_pincode:  '400001',
        restro_phone:    '9123456789',
        restro_password: 'restropass123'
    },

    menuItem: {
        item_name:        'Butter Chicken',
        item_description: 'Creamy tomato-based curry with tender chicken',
        item_price:       350.00,
        is_available:     true
    },

    order: {
        total_amount: 700.00,
        order_status: 'PLACED'
    },

    orderedItem: {
        item_quantity: 2,
        item_amount:   700.00
    }
};

// ============================================================
// INTERNALS — IDs captured between test steps
// ============================================================
const captured = {
    user_id:       null,
    restro_id:     null,
    item_id:       null,
    order_id:      null,
    order_item_id: null
};

let PASS = 0;
let FAIL = 0;

// ============================================================
// HTTP HELPER
// ============================================================
function request(method, path, body = null) {
    return new Promise((resolve, reject) => {
        const url    = new URL(TEST_DATA.BASE_URL + path);
        const data   = body ? JSON.stringify(body) : null;

        const options = {
            hostname: url.hostname,
            port:     url.port || 80,
            path:     url.pathname,
            method,
            headers:  { 'Content-Type': 'application/json' }
        };
        if (data) options.headers['Content-Length'] = Buffer.byteLength(data);

        const req = http.request(options, (res) => {
            let raw = '';
            res.on('data', chunk => raw += chunk);
            res.on('end', () => {
                try   { resolve({ status: res.statusCode, body: JSON.parse(raw) }); }
                catch { resolve({ status: res.statusCode, body: raw }); }
            });
        });

        req.on('error', reject);
        if (data) req.write(data);
        req.end();
    });
}

// ============================================================
// TEST HELPER
// ============================================================
function check(label, status, expectedStatus, body) {
    const ok = status === expectedStatus;
    if (ok) {
        console.log(`  \x1b[32m✓ PASS\x1b[0m [${status}] ${label}`);
        PASS++;
    } else {
        console.log(`  \x1b[31m✗ FAIL\x1b[0m [${status}] ${label} (expected ${expectedStatus})`);
        console.log(`         →`, JSON.stringify(body));
        FAIL++;
    }
    return ok;
}

// ============================================================
// TEST SUITES
// ============================================================

async function testUsers() {
    console.log('\n\x1b[36m══════════════════════════════════════\x1b[0m');
    console.log('\x1b[36m  USER APIs\x1b[0m');
    console.log('\x1b[36m══════════════════════════════════════\x1b[0m');

    // Create User
    let r = await request('POST', '/user/createUser', TEST_DATA.user);
    check('POST /user/createUser', r.status, 201, r.body);

    // Get All Users → capture user_id
    r = await request('GET', '/user/getAllUsers');
    if (check('GET /user/getAllUsers', r.status, 200, r.body)) {
        // handle both correct shape (users: [...]) and stale-Docker nested shape (users: { users: [...] })
        const usersArr = Array.isArray(r.body.users) ? r.body.users : r.body.users?.users;
        const match = usersArr?.find(u => u.user_email === TEST_DATA.user.user_email);
        captured.user_id = match?.user_id || null;
        console.log(`         → captured user_id: \x1b[33m${captured.user_id}\x1b[0m`);
    }

    // Get User
    r = await request('GET', `/user/getUser/${captured.user_id}`);
    check('GET /user/getUser/:user_id', r.status, 200, r.body);

    // Edit User
    r = await request('PUT', `/user/editUser/${captured.user_id}`, {
        ...TEST_DATA.user,
        user_firstname: 'TestEdited'
    });
    check('PUT /user/editUser/:user_id', r.status, 200, r.body);

    // Get non-existent User → 404
    r = await request('GET', '/user/getUser/USER_DOES_NOT_EXIST');
    check('GET /user/getUser (not found → 404)', r.status, 404, r.body);

    // Delete User
    r = await request('DELETE', `/user/deleteUser/${captured.user_id}`);
    check('DELETE /user/deleteUser/:user_id', r.status, 200, r.body);
}

async function testRestros() {
    console.log('\n\x1b[36m══════════════════════════════════════\x1b[0m');
    console.log('\x1b[36m  RESTRO APIs\x1b[0m');
    console.log('\x1b[36m══════════════════════════════════════\x1b[0m');

    // Create Restro
    let r = await request('POST', '/restro/createRestro', TEST_DATA.restro);
    if (check('POST /restro/createRestro', r.status, 201, r.body)) {
        captured.restro_id = r.body.restro_id;
        console.log(`         → captured restro_id: \x1b[33m${captured.restro_id}\x1b[0m`);
    }

    // Get All Restros
    r = await request('GET', '/restro/getAllRestros');
    check('GET /restro/getAllRestros', r.status, 200, r.body);

    // Get Restro
    r = await request('GET', `/restro/getRestro/${captured.restro_id}`);
    check('GET /restro/getRestro/:restro_id', r.status, 200, r.body);

    // Edit Restro
    r = await request('PUT', `/restro/editRestro/${captured.restro_id}`, {
        restro_name:     'Test Kitchen Updated',
        restro_location: '456 Edited Street, Mumbai'
    });
    check('PUT /restro/editRestro/:restro_id', r.status, 200, r.body);

    // Get non-existent Restro → 404
    r = await request('GET', '/restro/getRestro/RESTRO_DOES_NOT_EXIST');
    check('GET /restro/getRestro (not found → 404)', r.status, 404, r.body);
}

async function testMenuItems() {
    console.log('\n\x1b[36m══════════════════════════════════════\x1b[0m');
    console.log('\x1b[36m  MENU ITEM APIs\x1b[0m');
    console.log('\x1b[36m══════════════════════════════════════\x1b[0m');

    if (!captured.restro_id) {
        console.log('  \x1b[33m⚠ Skipped — restro_id not captured (run restros test first)\x1b[0m');
        return;
    }

    // Create Menu Item
    let r = await request('POST', '/restro/createMenuItem', {
        ...TEST_DATA.menuItem,
        restro_id: captured.restro_id
    });
    if (check('POST /restro/createMenuItem', r.status, 201, r.body)) {
        captured.item_id = r.body.item_id;
        console.log(`         → captured item_id: \x1b[33m${captured.item_id}\x1b[0m`);
    }

    // Get Menu Item
    r = await request('GET', `/restro/getMenuItem/${captured.item_id}`);
    check('GET /restro/getMenuItem/:item_id', r.status, 200, r.body);

    // Get All Menu Items
    r = await request('GET', `/restro/getAllMenuItems/${captured.restro_id}`);
    check('GET /restro/getAllMenuItems/:restro_id', r.status, 200, r.body);

    // Edit Menu Item
    r = await request('PUT', `/restro/editMenuItem/${captured.item_id}`, {
        item_name:        'Butter Chicken Special',
        item_description: 'Updated description',
        item_price:       380.00,
        is_available:     true
    });
    check('PUT /restro/editMenuItem/:item_id', r.status, 200, r.body);

    // Get non-existent item → 404
    r = await request('GET', '/restro/getMenuItem/ITEM_DOES_NOT_EXIST');
    check('GET /restro/getMenuItem (not found → 404)', r.status, 404, r.body);
}

async function testOrders() {
    console.log('\n\x1b[36m══════════════════════════════════════\x1b[0m');
    console.log('\x1b[36m  ORDER APIs\x1b[0m');
    console.log('\x1b[36m══════════════════════════════════════\x1b[0m');

    if (!captured.user_id || !captured.restro_id) {
        // Re-capture IDs from DB if user/restro tests were skipped
        if (!captured.user_id) {
            const allUsers = await request('GET', '/user/getAllUsers');
            captured.user_id = allUsers.body.users?.[0]?.user_id || null;
        }
        if (!captured.restro_id) {
            const allRestros = await request('GET', '/restro/getAllRestros');
            captured.restro_id = allRestros.body.restros?.[0]?.restro_id || null;
        }
        if (!captured.user_id || !captured.restro_id) {
            console.log('  \x1b[33m⚠ Skipped — user_id or restro_id not available\x1b[0m');
            return;
        }
    }

    // Create Order
    let r = await request('POST', '/order/createOrder', {
        ...TEST_DATA.order,
        user_id:   captured.user_id,
        restro_id: captured.restro_id
    });
    if (check('POST /order/createOrder', r.status, 201, r.body)) {
        // order_id returned as field in new code; fallback: parse from message string
        captured.order_id = r.body.order_id
            || r.body.message?.match(/Order (ORDER_[\w-]+)/)?.[1]
            || null;
        console.log(`         → captured order_id: \x1b[33m${captured.order_id}\x1b[0m`);
    }

    // Get All Orders
    r = await request('GET', '/order/getAllOrders');
    check('GET /order/getAllOrders', r.status, 200, r.body);

    // Get Order
    r = await request('GET', `/order/getOrder/${captured.order_id}`);
    check('GET /order/getOrder/:order_id', r.status, 200, r.body);

    // Edit Order
    r = await request('PUT', `/order/editOrder/${captured.order_id}`, {
        user_id:      captured.user_id,
        restro_id:    captured.restro_id,
        total_amount: 900.00,
        order_status: 'DELIVERED'
    });
    check('PUT /order/editOrder/:order_id', r.status, 200, r.body);

    // Get non-existent order → 404
    r = await request('GET', '/order/getOrder/ORDER_DOES_NOT_EXIST');
    check('GET /order/getOrder (not found → 404)', r.status, 404, r.body);
}

async function testOrderedItems() {
    console.log('\n\x1b[36m══════════════════════════════════════\x1b[0m');
    console.log('\x1b[36m  ORDERED ITEM APIs\x1b[0m');
    console.log('\x1b[36m══════════════════════════════════════\x1b[0m');

    if (!captured.order_id || !captured.item_id) {
        console.log('  \x1b[33m⚠ Skipped — order_id or item_id not captured (run orders + menuItems tests first)\x1b[0m');
        return;
    }

    // Create Ordered Item
    let r = await request('POST', '/order/createOrderedItem', {
        ...TEST_DATA.orderedItem,
        order_id: captured.order_id,
        item_id:  captured.item_id
    });
    check('POST /order/createOrderedItem', r.status, 201, r.body);

    // Get All Ordered Items → capture order_item_id
    r = await request('GET', `/order/getAllOrderedItems/${captured.order_id}`);
    if (check('GET /order/getAllOrderedItems/:order_id', r.status, 200, r.body)) {
        captured.order_item_id = r.body.orderedItems?.[0]?.order_item_id || null;
        console.log(`         → captured order_item_id: \x1b[33m${captured.order_item_id}\x1b[0m`);
    }

    // Get Ordered Item
    r = await request('GET', `/order/getOrderedItem/${captured.order_item_id}`);
    check('GET /order/getOrderedItem/:order_item_id', r.status, 200, r.body);

    // Edit Ordered Item
    r = await request('PUT', `/order/editOrderedItem/${captured.order_item_id}`, {
        item_quantity: 3,
        item_amount:   1050.00
    });
    check('PUT /order/editOrderedItem/:order_item_id', r.status, 200, r.body);

    // Delete Ordered Item
    r = await request('DELETE', `/order/deleteOrderedItem/${captured.order_item_id}`);
    check('DELETE /order/deleteOrderedItem/:order_item_id', r.status, 200, r.body);

    // Get non-existent ordered item → 404
    r = await request('GET', '/order/getOrderedItem/999999');
    check('GET /order/getOrderedItem (not found → 404)', r.status, 404, r.body);
}

// ============================================================
// CLEANUP — deletes everything created during the test run
// ============================================================
async function cleanup() {
    console.log('\n\x1b[36m══════════════════════════════════════\x1b[0m');
    console.log('\x1b[36m  CLEANUP\x1b[0m');
    console.log('\x1b[36m══════════════════════════════════════\x1b[0m');

    if (captured.order_id) {
        const r = await request('DELETE', `/order/deleteOrder/${captured.order_id}`);
        check('DELETE /order/deleteOrder (cleanup)', r.status, 200, r.body);
    }
    if (captured.item_id) {
        const r = await request('DELETE', `/restro/deleteMenuItem/${captured.item_id}`);
        check('DELETE /restro/deleteMenuItem (cleanup)', r.status, 200, r.body);
    }
    if (captured.restro_id) {
        const r = await request('DELETE', `/restro/deleteRestro/${captured.restro_id}`);
        check('DELETE /restro/deleteRestro (cleanup)', r.status, 200, r.body);
    }
}

// ============================================================
// RUNNER
// ============================================================
const SUITE_MAP = {
    users:        testUsers,
    restros:      testRestros,
    menuItems:    testMenuItems,
    orders:       testOrders,
    orderedItems: testOrderedItems
};

async function run() {
    console.log('\n\x1b[1m\x1b[35m╔══════════════════════════════════════╗\x1b[0m');
    console.log('\x1b[1m\x1b[35m║  Obsidian Backend — API Test Runner  ║\x1b[0m');
    console.log('\x1b[1m\x1b[35m╚══════════════════════════════════════╝\x1b[0m');
    console.log(`\x1b[90m  Target : ${TEST_DATA.BASE_URL}\x1b[0m`);
    console.log(`\x1b[90m  Suites : ${TESTS_TO_RUN.join(', ')}\x1b[0m`);

    // Validate selected suites
    const invalid = TESTS_TO_RUN.filter(s => !SUITE_MAP[s]);
    if (invalid.length) {
        console.error(`\n\x1b[31mInvalid suite(s) in TESTS_TO_RUN: ${invalid.join(', ')}\x1b[0m`);
        console.error(`Valid options: ${Object.keys(SUITE_MAP).join(', ')}`);
        process.exit(1);
    }

    for (const suite of TESTS_TO_RUN) {
        await SUITE_MAP[suite]();
    }

    await cleanup();

    // Results
    const total = PASS + FAIL;
    console.log('\n\x1b[36m══════════════════════════════════════\x1b[0m');
    console.log(`\x1b[1m  RESULTS:  \x1b[32m${PASS} passed\x1b[0m  \x1b[31m${FAIL} failed\x1b[0m  (${total} total)`);
    console.log('\x1b[36m══════════════════════════════════════\x1b[0m\n');

    if (FAIL > 0) process.exit(1);
}

run().catch(err => {
    console.error('\n\x1b[31mUnhandled error:\x1b[0m', err.message);
    process.exit(1);
});
