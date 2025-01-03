package application_test

import (
	mock_application_interface "goHexagonal/application/mocks"
	application "goHexagonal/application/product"
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/require"
)

func TestShouldProperlyGetAnProduct(t *testing.T) {
	controller := gomock.NewController(t)
	defer controller.Finish()

	product := mock_application_interface.NewMockProductInterface(controller)
	persistence := mock_application_interface.NewMockProductPersistenceInterface(controller)

	persistence.EXPECT().Get(gomock.Any()).Return(product, nil).AnyTimes()

	service := application.ProductService{
		Persistence: persistence,
	}

	result, err := service.Get("uuid")

	require.Nil(t, err)
	require.Equal(t, product, result)
}

func TestShouldProperlyCreateAnProduct(t *testing.T) {
	controller := gomock.NewController(t)
	defer controller.Finish()

	product := mock_application_interface.NewMockProductInterface(controller)
	persistence := mock_application_interface.NewMockProductPersistenceInterface(controller)

	persistence.EXPECT().Create(gomock.Any()).Return(product, nil).AnyTimes()

	service := application.ProductService{
		Persistence: persistence,
	}

	result, err := service.Create("name", 13)

	require.Nil(t, err)
	require.Equal(t, product, result)
}

func TestShouldProperlyUpdateAnProduct(t *testing.T) {
	controller := gomock.NewController(t)
	defer controller.Finish()

	product := mock_application_interface.NewMockProductInterface(controller)
	persistence := mock_application_interface.NewMockProductPersistenceInterface(controller)

	product.EXPECT().GetId().Return(gomock.Any().String()).AnyTimes()
	product.EXPECT().GetName().Return(gomock.Any().String()).AnyTimes()
	product.EXPECT().GetPrice().Return(float32(13)).AnyTimes()
	product.EXPECT().SetName(gomock.Any().String()).Return(nil).AnyTimes()
	product.EXPECT().SetPrice(float32(13)).Return(nil).AnyTimes()

	persistence.EXPECT().Get(gomock.Any()).Return(product, nil).AnyTimes()
	persistence.EXPECT().Update(gomock.Any()).Return(product, nil).AnyTimes()

	service := application.ProductService{
		Persistence: persistence,
	}

	result, err := service.Update(product)

	require.Nil(t, err)
	require.Equal(t, product, result)
}

func TestShouldProperlyEnableAnProduct(t *testing.T) {
	controller := gomock.NewController(t)
	defer controller.Finish()

	product := mock_application_interface.NewMockProductInterface(controller)
	product.EXPECT().GetId().Return(gomock.Any().String()).AnyTimes()
	product.EXPECT().Enable().Return(nil)

	persistence := mock_application_interface.NewMockProductPersistenceInterface(controller)
	persistence.EXPECT().Get(gomock.Any()).Return(product, nil).AnyTimes()
	persistence.EXPECT().Enable(gomock.Any()).Return(product, nil).AnyTimes()

	service := application.ProductService{
		Persistence: persistence,
	}

	result, err := service.Enable(product)

	require.Nil(t, err)
	require.Equal(t, product, result)
}

func TestShouldProperlyDisableAnProduct(t *testing.T) {
	controller := gomock.NewController(t)
	defer controller.Finish()

	product := mock_application_interface.NewMockProductInterface(controller)
	product.EXPECT().GetId().Return(gomock.Any().String()).AnyTimes()
	product.EXPECT().Disable().Return(nil)

	persistence := mock_application_interface.NewMockProductPersistenceInterface(controller)
	persistence.EXPECT().Get(gomock.Any()).Return(product, nil).AnyTimes()
	persistence.EXPECT().Disable(gomock.Any()).Return(product, nil).AnyTimes()

	service := application.ProductService{
		Persistence: persistence,
	}

	result, err := service.Disable(product)

	require.Nil(t, err)
	require.Equal(t, product, result)
}
