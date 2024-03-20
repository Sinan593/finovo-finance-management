-- Drop tables if they exist
DROP TABLE IF EXISTS invoice_items;
DROP TABLE IF EXISTS invoices;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS notifications;

-- Create tables
CREATE TABLE users (
	id bigint primary key auto_increment,
    firstname varchar(50) not null,
    lastname varchar(50) not null,
    email varchar(50) not null unique,
    password varchar(300) not null,
    created_at datetime not null,
    verification_token varchar(300),
    is_verified boolean
);

CREATE TABLE products (
	id bigint auto_increment,
    user_id bigint references users(id) on delete cascade,
    name varchar(100) unique not null,
    category varchar(100) not null,
    brand varchar(50) not null,
    stock int not null,
    cost_price decimal(10,2) not null,
    selling_price decimal(10,2) not null,
    discount_rate decimal(5,2) not null,
    tax_rate decimal(5,2) not null,
    primary key(id, user_id)
);

CREATE TABLE invoices (
	id bigint auto_increment,
    user_id bigint references users(id) on delete cascade,
    reference_number varchar(50) unique not null,
    date datetime not null,
    customer_name varchar(100) not null,
    subtotal decimal(10,2),
    tax decimal(10,2),
    total decimal(10,2),
    payment_status enum('paid', 'unpaid') not null,
    primary key(id, user_id)
);

CREATE TABLE invoice_items (
	invoice_id bigint references invoices(id) on delete cascade,
	product_id bigint references products(id) on delete cascade,
	quantity int not null,
    unit_price decimal(10,2) not null,
    discount decimal(10,2) not null,
    subtotal decimal(10,2) not null,
    tax decimal(10,2) not null,
    total decimal(10,2) not null,
    primary key (invoice_id, product_id)
);

create table employees(
	id bigint auto_increment,
    user_id bigint references users(id) on delete cascade,
    firstname varchar(50) not null,
    lastname varchar(50) not null,
    email varchar(50) unique not null,
    phone varchar(15) unique not null,
    job_title varchar(50) not null,
    salary decimal(10,2) not null,
    primary key (id, user_id)
);

CREATE TABLE notifications(
    id BIGINT AUTO_INCREMENT,
    message VARCHAR(255) NOT NULL,
    user_id BIGINT REFERENCES users(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    primary key (id, user_id)
);
-- Stored procedure
DELIMITER //
DROP TRIGGER IF EXISTS update_invoice;
CREATE TRIGGER update_invoice AFTER INSERT ON invoice_items
FOR EACH ROW
BEGIN
    DECLARE new_subtotal DECIMAL(10,2);
    DECLARE new_tax DECIMAL(10,2);
    DECLARE new_total DECIMAL(10,2);
    
    SET new_subtotal = (SELECT SUM(subtotal) FROM invoice_items WHERE invoice_id = NEW.invoice_id);
    SET new_tax = (SELECT SUM(tax) FROM invoice_items WHERE invoice_id = NEW.invoice_id);
    SET new_total = new_subtotal + new_tax;
    
    UPDATE invoices SET subtotal = new_subtotal,
                        tax = new_tax,
                        total = new_total
                    WHERE id = NEW.invoice_id;
    
END;
//
DELIMITER ;

DELIMITER //

CREATE TRIGGER stock_notification
AFTER UPDATE ON products
FOR EACH ROW
BEGIN
    IF NEW.stock < 5 THEN
        INSERT INTO notifications (message, user_id) VALUES (CONCAT('Stock of product ', NEW.name, ' is low. Only ', NEW.stock,' pieces remain!'), NEW.user_id);
    END IF;
END;
//
DELIMITER ;