const insertOne = async (imageInfo) => {
    const columns = Object.keys(imageInfo);
    const values = Object.values(imageInfo);
    const query = "INSERT INTO image("+columns.join(",")+") VALUES("+columns.map(x=>"?").join(",")+")";
    await dbConn.query(query, values);
}

const fetchKey = async (productId, image_id) => {
    const query = "SELECT s3_bucket_path FROM image WHERE product_id=? AND image_id=? LIMIT 1";
    const [rows] = await dbConn.query(query, [productId, image_id]);
    if(rows.length) return rows[0];
    else return {};
}

const deleteImage = async (productId, image_id) => {
    const query = "DELETE FROM image WHERE product_id=? AND image_id=?";
    await dbConn.query(query, [productId, image_id]);
    return;
}

const fetchAllImages = async (productId) => {
    const query = "SELECT s3_bucket_path FROM image WHERE product_id=?";
    const [rows] = await dbConn.query(query, [productId]);
    if(rows.length) return rows;
    else return {};
}

const deleteAllImages = async (productId, image_id) => {
    const query = "DELETE FROM image WHERE product_id=?";
    await dbConn.query(query, [productId]);
    return;
}

const fetchByKey = async (key) => {
    const query = "SELECT * FROM image WHERE s3_bucket_path=? LIMIT 1";
    const [rows] = await dbConn.query(query, [key]);
    if(rows.length) return rows[0];
    else return {}; 
}

export default {
    insertOne,
    fetchKey,
    deleteImage,
    fetchAllImages,
    deleteAllImages,
    fetchByKey,
}