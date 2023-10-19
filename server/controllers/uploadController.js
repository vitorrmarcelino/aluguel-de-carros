const UserModel = require("../models/user.model");

exports.put = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res
        .status(400)
        .json({ msg: "Nenhum arquivo de imagem foi enviado." });
    }

    await UserModel.findByIdAndUpdate(
      req.params.id,
      { imageUrl: file.path },
      { new: true }
    );

    res.json({
      msg: "Imagem de perfil do usuário atualizada com sucesso",
    });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao salvar a imagem." });
  }
};
