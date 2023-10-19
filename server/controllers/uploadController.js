const ImageUrlModel = require("../models/img.url.model");

exports.post = async (req, res) => {
  try {
    const file = req.file;
    const id = req.params.id;
    if (!file) {
      return res
        .status(400)
        .json({ msg: "Nenhum arquivo de imagem foi enviado." });
    }
    const imageUrl = new ImageUrlModel({
      imageUrl: file.path,
      userId: id,
    });

    await imageUrl.save();
    res.json({
      msg: "Imagem de perfil do usuário atualizada com sucesso",
    });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao salvar a imagem." });
  }
};
