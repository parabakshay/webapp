import _ from 'lodash';

const findOne = async (_id) => {
    const query = "SELECT * FROM product WHERE id=? LIMIT 1";
    const [rows] = await dbConn.query(query, [_id]);
    if(rows.length) return rows[0];
    else return {};
}

const insertOne = async (productInfo) => {
    const columns = Object.keys(productInfo);
    const values = Object.values(productInfo);
    const query = "INSERT INTO product("+columns.join(",")+") VALUES("+columns.map(x=>"?").join(",")+")";
    await dbConn.query(query, values);
}

const updateById = async (productInfo, _id) => {
    const columns = Object.keys(productInfo);
    const values = Object.values(productInfo);
    values.push(_id);
    const query = "UPDATE product SET " + columns.join(" = ? ,") +" = ? WHERE id = ?";
    const [metaData] = await dbConn.query(query, values);
    return metaData;
};

const deleteById = async (_id) => {
    const query = "DELETE FROM product WHERE id=?";
    const [metaData] = await dbConn.query(query, [_id]);
    return metaData;
}

const findBySkuId = async (_id) => {
    const query = "SELECT * FROM product WHERE sku=? LIMIT 1";
    const [rows] = await dbConn.query(query, [_id]);
    if(rows.length) return rows[0];
    else return {};
}

const getProductImages = async (_id) => {
    const query = "SELECT i.image_id, i.product_id, i.file_name, i.date_created, i.s3_bucket_path FROM product p INNER JOIN image i ON p.id = i.product_id WHERE p.id=?";
    const [rows] = await dbConn.query(query, [_id]);
    if(rows.length) return rows;
    else return {};
}

const fetchProductImage = async (productId, image_id) => {
    const query = "SELECT i.image_id, i.product_id, i.file_name, i.date_created, i.s3_bucket_path FROM product p INNER JOIN image i ON p.id = i.product_id WHERE p.id=? AND i.image_id=? LIMIT 1";
    const [rows] = await dbConn.query(query, [productId, image_id]);
    if(rows.length) return rows[0];
    else return {};
}


export default {
    findOne,
    insertOne,
    updateById,
    deleteById,
    findBySkuId,
    getProductImages,
    fetchProductImage
}