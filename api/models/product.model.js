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

export default {
    findOne,
    insertOne,
    updateById,
    deleteById,
    findBySkuId,
}