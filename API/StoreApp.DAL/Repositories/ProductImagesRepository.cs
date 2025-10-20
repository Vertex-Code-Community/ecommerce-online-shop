using StoreApp.DAL.Data;
using StoreApp.DAL.Exceptions.Handlers;
using StoreApp.DAL.Repositories.Interfaces;
using StoreApp.Entities.Entities;

namespace StoreApp.DAL.Repositories;

public class ProductImagesRepository(AppDbContext appDbContext, IDbExceptionHandler handler) 
    : GenericRepository<ProductImagesEntity, AppDbContext, long>(appDbContext, handler) , IProductImagesRepository;