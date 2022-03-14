-- CreateTable
CREATE TABLE `tb_desenvolvedores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nivel` INTEGER NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `sexo` VARCHAR(191) NOT NULL,
    `datanascimento` VARCHAR(191) NOT NULL,
    `idade` INTEGER NOT NULL,
    `hobby` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_niveis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nivel` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_desenvolvedores` ADD CONSTRAINT `tb_desenvolvedores_nivel_fkey` FOREIGN KEY (`nivel`) REFERENCES `tb_niveis`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
