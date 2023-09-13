import Category from '../models/Category.js';

export const createCategory = async (req, res) => {
    const newCategory = new Category(req.body);
    try {
        await newCategory.save();

        res.status(200).json({ success: true, message: 'Thêm mới thành công' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateCategory = async (req, res) => {
    const id = req.params.id;
    try {
        await Category.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            { new: true },
        );

        res.status(200).json({ success: true, message: 'Cập nhật thành công' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getDetailCategory = async (req, res) => {
    const id = req.params.id;
    try {
        const item = await Category.findById(id);
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};

export const getAllCategory = async (req, res) => {
    try {
        const items = await Category.find();

        res.status(200).json({ success: true, data: items });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
