using StoreApp.DAL.Data;
using StoreApp.DAL.Exceptions.Handlers;
using StoreApp.DAL.Repositories.Interfaces;
using StoreApp.Entities.Entities;

namespace StoreApp.DAL.Repositories;

public class ProductRepository(AppDbContext appDbContext, IDbExceptionHandler handler) 
    : GenericRepository<ProductEntity, AppDbContext, int>(appDbContext, handler) , IProductRepository;