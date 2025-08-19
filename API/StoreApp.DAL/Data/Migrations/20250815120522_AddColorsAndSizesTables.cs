using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StoreApp.DAL.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddColorsAndSizesTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductVariant_ColorEntity_ColorId",
                table: "ProductVariant");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductVariant_Products_ProductId",
                table: "ProductVariant");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductVariant_SizeEntity_SizeId",
                table: "ProductVariant");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SizeEntity",
                table: "SizeEntity");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductVariant",
                table: "ProductVariant");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ColorEntity",
                table: "ColorEntity");

            migrationBuilder.RenameTable(
                name: "SizeEntity",
                newName: "Sizes");

            migrationBuilder.RenameTable(
                name: "ProductVariant",
                newName: "ProductVariants");

            migrationBuilder.RenameTable(
                name: "ColorEntity",
                newName: "Colors");

            migrationBuilder.RenameIndex(
                name: "IX_SizeEntity_Name",
                table: "Sizes",
                newName: "IX_Sizes_Name");

            migrationBuilder.RenameIndex(
                name: "IX_ProductVariant_SizeId",
                table: "ProductVariants",
                newName: "IX_ProductVariants_SizeId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductVariant_ProductId",
                table: "ProductVariants",
                newName: "IX_ProductVariants_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductVariant_ColorId",
                table: "ProductVariants",
                newName: "IX_ProductVariants_ColorId");

            migrationBuilder.RenameIndex(
                name: "IX_ColorEntity_Name",
                table: "Colors",
                newName: "IX_Colors_Name");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Sizes",
                table: "Sizes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductVariants",
                table: "ProductVariants",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Colors",
                table: "Colors",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductVariants_Colors_ColorId",
                table: "ProductVariants",
                column: "ColorId",
                principalTable: "Colors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductVariants_Products_ProductId",
                table: "ProductVariants",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductVariants_Sizes_SizeId",
                table: "ProductVariants",
                column: "SizeId",
                principalTable: "Sizes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductVariants_Colors_ColorId",
                table: "ProductVariants");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductVariants_Products_ProductId",
                table: "ProductVariants");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductVariants_Sizes_SizeId",
                table: "ProductVariants");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Sizes",
                table: "Sizes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductVariants",
                table: "ProductVariants");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Colors",
                table: "Colors");

            migrationBuilder.RenameTable(
                name: "Sizes",
                newName: "SizeEntity");

            migrationBuilder.RenameTable(
                name: "ProductVariants",
                newName: "ProductVariant");

            migrationBuilder.RenameTable(
                name: "Colors",
                newName: "ColorEntity");

            migrationBuilder.RenameIndex(
                name: "IX_Sizes_Name",
                table: "SizeEntity",
                newName: "IX_SizeEntity_Name");

            migrationBuilder.RenameIndex(
                name: "IX_ProductVariants_SizeId",
                table: "ProductVariant",
                newName: "IX_ProductVariant_SizeId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductVariants_ProductId",
                table: "ProductVariant",
                newName: "IX_ProductVariant_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductVariants_ColorId",
                table: "ProductVariant",
                newName: "IX_ProductVariant_ColorId");

            migrationBuilder.RenameIndex(
                name: "IX_Colors_Name",
                table: "ColorEntity",
                newName: "IX_ColorEntity_Name");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SizeEntity",
                table: "SizeEntity",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductVariant",
                table: "ProductVariant",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ColorEntity",
                table: "ColorEntity",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductVariant_ColorEntity_ColorId",
                table: "ProductVariant",
                column: "ColorId",
                principalTable: "ColorEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductVariant_Products_ProductId",
                table: "ProductVariant",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductVariant_SizeEntity_SizeId",
                table: "ProductVariant",
                column: "SizeId",
                principalTable: "SizeEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
