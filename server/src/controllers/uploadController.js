const UserModel = require("../models/user.model");

exports.update = async (req, res) => {
  try {
    const userExists = await UserModel.findById(req.params.id);
    if (!userExists) {
      return res
        .status(404)
        .json({ msg: `Usuário com ID ${req.params.id} não encontrado.` });
    }

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
      file,
    });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao salvar a imagem." });
  }
};

exports.delete = async (req, res) => {
  try {
    const userExists = await UserModel.findById(req.params.id);
    if (!userExists) {
      return res
        .status(404)
        .json({ msg: `Usuário com ID ${req.params.id} não encontrado.` });
    }

    await UserModel.findByIdAndUpdate(
      req.params.id,
      { imageUrl: "" },
      { new: true }
    );

    res.json({
      msg: "Imagem de perfil do usuário removida com sucesso"
    });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao salvar a imagem." });
  }
}
