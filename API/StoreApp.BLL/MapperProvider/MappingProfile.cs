using AutoMapper;
using StoreApp.DAL.Entities;
using StoreApp.Models.Dtos;
using StoreApp.Models.Dtos.Review;
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
        CreateMap<UserEntity, UserTokenDto>();
        
        CreateMap<ProductVariant, ProductVariantModel>()
            .ForMember(dest => dest.ColorName, opt => opt.MapFrom(src => src.Color.Name))
            .ForMember(dest => dest.ColorHex, opt => opt.MapFrom(src => src.Color.HexCode))
            .ForMember(dest => dest.SizeName, opt => opt.MapFrom(src => src.Size.Name));

        CreateMap<ProductEntity, ProductModel>()
            .ForMember(p => p.Variants, opt => opt.MapFrom(src => src.Variants))
            .ForMember(p => p.Rating, opt => opt.MapFrom(src => src.Reviews.Any() ? src.Reviews.Average(r => r.Rating) : 0))
            .ForMember(p => p.AvailableColors, opt => opt.MapFrom(src => src.Variants.Select(v => v.Color).Distinct()))
            .ForMember(p => p.AvailableSizes, opt => opt.MapFrom(src => src.Variants.Select(v => v.Size).Distinct()));
        
        CreateMap<ProductModel, ProductEntity>()
            .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.ImageUrl))
            .ForMember(dest => dest.CartItems, opt => opt.Ignore());

        CreateMap<CartItemEntity, CartItemModel>()
            .ForMember(dest => dest.ProductModel, opt => opt.MapFrom(src => src.Product))
            .ReverseMap();

        CreateMap<ReviewEntity, ReviewModel>()
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User.Email))
            .ReverseMap();

        CreateMap<CreateReview, ReviewEntity>();

        CreateMap<ColorEntity, ColorModel>();
        CreateMap<SizeEntity, SizeModel>();
    }
}
