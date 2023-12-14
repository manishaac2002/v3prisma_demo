-- CreateTable
CREATE TABLE `School` (
    `school_id` INTEGER NOT NULL,
    `school_address` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `School_school_address_key`(`school_address`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `School` ADD CONSTRAINT `School_school_id_fkey` FOREIGN KEY (`school_id`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
