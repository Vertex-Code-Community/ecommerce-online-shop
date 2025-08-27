using StoreApp.DAL.Data;
using StoreApp.DAL.Entities;
using StoreApp.DAL.Exceptions.Handlers;
using StoreApp.DAL.Repositories.Interfaces;

namespace StoreApp.DAL.Repositories;

public class ProductRepository(AppDbContext appDbContext, IDbExceptionHandler handler) 
    : GenericRepository<ProductEntity, AppDbContext, int>(appDbContext, handler) , IProductRepository;