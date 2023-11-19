import Materiais from "./Modelo/materiais.js";

let material1 = new Materiais(0, "Argamassa", 20, 'https://cdn.leroymerlin.com.br/products/argamassa_aciii_interno_e_externo_branco_20kg_87912153_3a2d_600x600.jpg');
let material2 = new Materiais(0, "Cimento", 23.90, 'https://cdn.leroymerlin.com.br/products/cimento_cp_ii_e_32_saco_de_50kg_tupi_89310004_a641_600x600.jpg');
let material3 = new Materiais(0, "Lampada", 8.90, 'https://cdn.leroymerlin.com.br/products/lampada_fluorescente_kian_espiral_15w_luz_branca_127v__110v__88568165_2d53_600x600.jpg');
let material4 = new Materiais(0, "Areia", 2.59, 'https://cdn.leroymerlin.com.br/products/areia_media_lavada_saco_de_20kg_91941262_f756_600x600.jpg');

let listaMateriais = [material1, material2, material3, material4];

for (const materiais of listaMateriais) {
    materiais.gravar().then(() => {
        console.log("Material gravado com sucesso");
    }).catch((erro) => {
        console.log(erro);
    });
}