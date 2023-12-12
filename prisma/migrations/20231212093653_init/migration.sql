-- CreateTable
CREATE TABLE `Parents` (
    `parent_id` INTEGER NOT NULL,
    `parent_name` VARCHAR(191) NOT NULL,
    `parent_phone` INTEGER NOT NULL,

    UNIQUE INDEX `Parents_parent_phone_key`(`parent_phone`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Parents` ADD CONSTRAINT `Parents_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
