using AutoMapper;
using StoreApp.DAL.Entities;
using StoreApp.Models;

namespace StoreApp.BLL.MapperProvider;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<UserModel, UserEntity>()
            .ForMember(dest => dest.PasswordHash, opt => opt.Ignore())
            .ForMember(dest => dest.CartItems, opt => opt.Ignore());

        CreateMap<CredentialsDto, UserModel>();
        CreateMap<UserEntity, UserModel>();

        CreateMap<ProductDetailEntity, ProductDetailModel>();

        CreateMap<ProductEntity, FullProductModel>()
            .ForMember(p => p.Details, opt => opt.MapFrom(src => src.ProductDetails))
            .ForMember(p => p.Rating, opt => opt.MapFrom(src => src.Reviews.Any() ? src.Reviews.Average(r => r.Rating) : 0));
        
        CreateMap<FullProductModel, ProductEntity>()
            .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.ImageUrl))
            .ForMember(dest => dest.CartItems, opt => opt.Ignore());

        CreateMap<CartItemEntity, CartItemModel>()
            .ForMember(dest => dest.ProductModel, opt => opt.MapFrom(src => src.ProductDetail.Product))
            .ReverseMap();

        CreateMap<ReviewEntity, ReviewModel>()
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User.Email))
            .ReverseMap();

        CreateMap<CreateReview, ReviewEntity>();
    }
}
