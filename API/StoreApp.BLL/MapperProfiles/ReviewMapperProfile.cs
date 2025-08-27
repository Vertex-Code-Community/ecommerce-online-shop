using AutoMapper;
using StoreApp.DAL.Entities;
using StoreApp.Models;

namespace StoreApp.BLL.MapperProfiles;

public class ReviewMapperProfile : Profile
{
    public ReviewMapperProfile()
    {
        CreateMap<ReviewEntity, ReviewModel>()
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User.Email));

        CreateMap<CreateReview, ReviewEntity>();
    }
}