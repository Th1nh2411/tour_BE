import Guide from '../models/Guide.js';

export const createGuide = async (req, res) => {
    const newGuide = new Guide(req.body);
    try {
        await newGuide.save();

        res.status(200).json({ success: true, message: 'Thêm mới thành công' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateGuide = async (req, res) => {
    const id = req.params.id;
    try {
        await Guide.findByIdAndUpdate(
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

export const getDetailGuide = async (req, res) => {
    const id = req.params.id;
    try {
        const guide = await Guide.findById(id);
        res.status(200).json({ success: true, data: guide });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};

export const getAllGuide = async (req, res) => {
    try {
        const guide = await Guide.find();

        res.status(200).json({ success: true, data: guide });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
