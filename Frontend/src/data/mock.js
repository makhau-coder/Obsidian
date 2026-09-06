export const currentUser = {
  user_id: "usr_1001",
  user_firstname: "Abhay",
  user_lastname: "Chaudhary",
  user_gender: "MALE",
  user_role: "CUSTOMER",
  user_email: "abhay@obsidian.food",
  user_phone: "+91 98200 11223",
  created_at: "2026-01-14",
};

export const users = [
  { user_id: "usr_1001", user_firstname: "Abhay", user_lastname: "Chaudhary", user_gender: "MALE", user_role: "CUSTOMER", user_email: "abhay@obsidian.food", user_phone: "+91 98200 11223", created_at: "2026-01-14" },
  { user_id: "usr_1002", user_firstname: "Meera", user_lastname: "Nair", user_gender: "FEMALE", user_role: "MERCHANT", user_email: "meera@spicebowl.in", user_phone: "+91 90040 55221", created_at: "2026-02-02" },
  { user_id: "usr_1003", user_firstname: "Rohan", user_lastname: "Desai", user_gender: "MALE", user_role: "MERCHANT", user_email: "rohan@tandoorlane.in", user_phone: "+91 98111 77345", created_at: "2026-02-19" },
  { user_id: "usr_1004", user_firstname: "Sara", user_lastname: "Khan", user_gender: "FEMALE", user_role: "CUSTOMER", user_email: "sara.khan@mail.com", user_phone: "+91 99887 32211", created_at: "2026-03-06" },
  { user_id: "usr_1005", user_firstname: "Dev", user_lastname: "Menon", user_gender: "OTHERS", user_role: "ADMIN", user_email: "dev@obsidian.food", user_phone: "+91 90011 45678", created_at: "2025-12-01" },
];

export const restros = [
  { restro_id: "res_01", restro_owner_id: "usr_1002", restro_name: "Spice Bowl", restro_location: "Linking Road, Bandra West, Mumbai", restro_pincode: "400050", created_at: "2026-02-03", cuisine: "North Indian", rating: 4.6, eta: "28 min" },
  { restro_id: "res_02", restro_owner_id: "usr_1003", restro_name: "Tandoor Lane", restro_location: "Sector 29, Gurugram", restro_pincode: "122002", created_at: "2026-02-20", cuisine: "Kebabs & Grills", rating: 4.4, eta: "35 min" },
  { restro_id: "res_03", restro_owner_id: "usr_1002", restro_name: "Noodle Theory", restro_location: "Indiranagar 100ft Road, Bengaluru", restro_pincode: "560038", created_at: "2026-03-11", cuisine: "Pan Asian", rating: 4.7, eta: "24 min" },
  { restro_id: "res_04", restro_owner_id: "usr_1003", restro_name: "Cafe Marigold", restro_location: "Park Street, Kolkata", restro_pincode: "700016", created_at: "2026-04-01", cuisine: "Continental", rating: 4.2, eta: "31 min" },
  { restro_id: "res_05", restro_owner_id: "usr_1002", restro_name: "Dosa Junction", restro_location: "T. Nagar, Chennai", restro_pincode: "600017", created_at: "2026-04-22", cuisine: "South Indian", rating: 4.8, eta: "19 min" },
  { restro_id: "res_06", restro_owner_id: "usr_1003", restro_name: "Bombay Pizza Co.", restro_location: "Koregaon Park, Pune", restro_pincode: "411001", created_at: "2026-05-09", cuisine: "Pizza", rating: 4.1, eta: "40 min" },
];

export const menuItems = [
  { item_id: "itm_01", restro_id: "res_01", item_name: "Butter Chicken", item_description: "Slow simmered tomato gravy, cream, kasuri methi. Served with two butter naan.", item_price: 389, is_available: true },
  { item_id: "itm_02", restro_id: "res_01", item_name: "Paneer Tikka Masala", item_description: "Charred paneer cubes tossed in a smoky onion-tomato masala.", item_price: 329, is_available: true },
  { item_id: "itm_03", restro_id: "res_01", item_name: "Dal Makhani", item_description: "Black lentils cooked overnight, finished with white butter.", item_price: 269, is_available: false },
  { item_id: "itm_04", restro_id: "res_01", item_name: "Garlic Naan", item_description: "Tandoor baked, brushed with garlic butter and coriander.", item_price: 79, is_available: true },
  { item_id: "itm_05", restro_id: "res_02", item_name: "Galouti Kebab", item_description: "Melt-in-mouth minced kebab with a hint of rose water.", item_price: 419, is_available: true },
  { item_id: "itm_06", restro_id: "res_03", item_name: "Chilli Basil Ramen", item_description: "House broth, soft egg, burnt garlic oil, thai basil.", item_price: 359, is_available: true },
];

export const orders = [
  { order_id: "ord_9001", user_id: "usr_1001", restro_id: "res_01", order_status: "PREPARING", total_amount: 797, created_at: "2026-08-29 19:42" },
  { order_id: "ord_9002", user_id: "usr_1004", restro_id: "res_03", order_status: "PLACED", total_amount: 718, created_at: "2026-08-29 18:10" },
  { order_id: "ord_9003", user_id: "usr_1001", restro_id: "res_05", order_status: "DELIVERED", total_amount: 264, created_at: "2026-08-27 09:25" },
  { order_id: "ord_9004", user_id: "usr_1004", restro_id: "res_02", order_status: "CANCELLED", total_amount: 838, created_at: "2026-08-25 21:05" },
  { order_id: "ord_9005", user_id: "usr_1001", restro_id: "res_04", order_status: "DELIVERED", total_amount: 512, created_at: "2026-08-21 13:55" },
];

export const orderedItems = [
  { order_item_id: 1, order_id: "ord_9001", item_id: "itm_01", item_name: "Butter Chicken", item_quantity: 2, item_amount: 778 },
  { order_item_id: 2, order_id: "ord_9001", item_id: "itm_04", item_name: "Garlic Naan", item_quantity: 1, item_amount: 79 },
  { order_item_id: 3, order_id: "ord_9002", item_id: "itm_06", item_name: "Chilli Basil Ramen", item_quantity: 2, item_amount: 718 },
];

export const cartItems = [
  { item_id: "itm_01", item_name: "Butter Chicken", item_price: 389, quantity: 2 },
  { item_id: "itm_04", item_name: "Garlic Naan", item_price: 79, quantity: 3 },
  { item_id: "itm_02", item_name: "Paneer Tikka Masala", item_price: 329, quantity: 1 },
];

export const statuses = ["PLACED", "PREPARING", "DELIVERED", "CANCELLED"];

export function restroName(id) {
  const found = restros.find((r) => r.restro_id === id);
  return found ? found.restro_name : "Unknown";
}

export function userName(id) {
  const found = users.find((u) => u.user_id === id);
  return found ? found.user_firstname + " " + found.user_lastname : "Unknown";
}
