import { Sequelize } from "sequelize";
import { SequelizeStorage, Umzug } from "umzug";
import { join } from "path"

export const migrator = (
    sequelize: Sequelize
) => {
    return new Umzug({
        migrations: {
            glob: [
                "*/migration/files/*.{js,ts}",
                {
                    cwd: join(__dirname, "../../../"),
                    ignore: ["**/*.d.ts", "**/index.ts", "**/index.js"],
                },
            ],
        },
        context: sequelize,
        storage: new SequelizeStorage({ sequelize }),
        logger: console
    })
}