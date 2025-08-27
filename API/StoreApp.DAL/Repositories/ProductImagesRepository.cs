using StoreApp.DAL.Data;
using StoreApp.DAL.Entities;
using StoreApp.DAL.Exceptions.Handlers;
using StoreApp.DAL.Repositories.Interfaces;

namespace StoreApp.DAL.Repositories;

public class ProductImagesRepository(AppDbContext appDbContext, IDbExceptionHandler handler) 
    : GenericRepository<ProductImagesEntity, AppDbContext, long>(appDbContext, handler) , IProductImagesRepository;