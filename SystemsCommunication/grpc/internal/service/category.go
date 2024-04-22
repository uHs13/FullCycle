package service

import (
	"context"
	"grpc/internal/database"
	"grpc/internal/pb"
	"io"
)

type CategoryService struct {
	pb.UnimplementedCategoryServiceServer
	CategoryDb database.Category
}

func NewCategoryService(categoryDB database.Category) *CategoryService {
	return &CategoryService{
		CategoryDb: categoryDB,
	}
}

func (c *CategoryService) CreateCategory(
	ctx context.Context,
	in *pb.CreateCategoryRequest,
) (*pb.CategoryResponse, error) {
	category, err := c.CategoryDb.Create(in.Name, in.Description)

	if err != nil {
		return nil, err
	}

	pbCategory := &pb.Category{
		Id:          category.ID,
		Name:        category.Name,
		Description: category.Description,
	}

	return &pb.CategoryResponse{Category: pbCategory}, nil
}

func (c *CategoryService) ListCategories(
	ctx context.Context,
	in *pb.Blank,
) (*pb.CategoryList, error) {
	categories, err := c.CategoryDb.FindAll()

	if err != nil {
		return nil, err
	}

	var categoriesResponse []*pb.Category

	for _, category := range categories {
		categoryResponse := &pb.Category{
			Id:          category.ID,
			Name:        category.Name,
			Description: category.Description,
		}

		categoriesResponse = append(categoriesResponse, categoryResponse)
	}

	return &pb.CategoryList{
		Categories: categoriesResponse,
	}, nil
}

func (c *CategoryService) GetCategory(
	ctx context.Context,
	in *pb.CategoryGetRequest,
) (*pb.Category, error) {
	category, err := c.CategoryDb.FindById(in.Id)

	if err != nil {
		return nil, err
	}

	return &pb.Category{
		Id:          category.ID,
		Name:        category.Name,
		Description: category.Description,
	}, nil
}

func (c *CategoryService) CreateCategoryStream(
	stream pb.CategoryService_CreateCategoryStreamServer,
) error {
	categories := &pb.CategoryList{}

	for {
		category, err := stream.Recv()

		if err == io.EOF {
			return stream.SendAndClose(categories)
		}

		if err != nil {
			return err
		}

		categoryResult, err := c.CategoryDb.Create(category.Name, category.Description)

		if err != nil {
			return err
		}

		categories.Categories = append(categories.Categories, &pb.Category{
			Id:          categoryResult.ID,
			Name:        categoryResult.Name,
			Description: categoryResult.Description,
		})
	}
}
