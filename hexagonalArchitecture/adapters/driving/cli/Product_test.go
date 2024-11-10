package cli_test

import (
	"fmt"
	"goHexagonal/adapters/driving/cli"
	mock_application_interface "goHexagonal/application/mocks"
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/require"
)

func TestShouldReturnTheProperMessageWhenSuccessfullyGetAProduct(t *testing.T) {
	controller := gomock.NewController(t)
	defer controller.Finish()

	productId := "uuid"
	productName := "Black and White T-shirt"
	productPrice := float32(13.0)
	productStatus := "enabled"

	productMock := mock_application_interface.NewMockProductInterface(controller)
	productMock.EXPECT().GetId().Return(productId).AnyTimes()
	productMock.EXPECT().GetName().Return(productName).AnyTimes()
	productMock.EXPECT().GetPrice().Return(productPrice).AnyTimes()
	productMock.EXPECT().GetStatus().Return(productStatus).AnyTimes()

	productServiceMock := mock_application_interface.NewMockProductServiceInterface(controller)
	productServiceMock.EXPECT().Get(gomock.Any()).Return(productMock, nil).AnyTimes()

	expectedResult := fmt.Sprintf(
		cli.GetResultConst,
		productId,
		productName,
		productPrice,
		productStatus,
	)

	result, err := cli.Run(productServiceMock, "get", productId, "", float32(0.0))

	require.Nil(t, err)
	require.Equal(t, expectedResult, result)
}

func TestShouldReturnTheProperMessageWhenSuccessfullyCreateAProduct(t *testing.T) {
	controller := gomock.NewController(t)
	defer controller.Finish()

	productId := "uuid"
	productName := "Black and White T-shirt"
	productPrice := float32(13.0)
	productStatus := "enabled"

	productMock := mock_application_interface.NewMockProductInterface(controller)
	productMock.EXPECT().GetId().Return(productId).AnyTimes()
	productMock.EXPECT().GetName().Return(productName).AnyTimes()
	productMock.EXPECT().GetPrice().Return(productPrice).AnyTimes()
	productMock.EXPECT().GetStatus().Return(productStatus).AnyTimes()

	productServiceMock := mock_application_interface.NewMockProductServiceInterface(controller)
	productServiceMock.EXPECT().Create(productName, productPrice).Return(productMock, nil).AnyTimes()

	expectedResult := fmt.Sprintf(
		cli.CreateResultConst,
		productId,
		productName,
		productPrice,
		productStatus,
	)

	result, err := cli.Run(productServiceMock, "create", "", productName, float32(productPrice))

	require.Nil(t, err)
	require.Equal(t, expectedResult, result)
}

func TestShouldReturnTheProperMessageWhenSuccessfullyUpdateAProduct(t *testing.T) {
	controller := gomock.NewController(t)
	defer controller.Finish()

	productId := "uuid"
	productName := "Black and White T-shirt"
	productPrice := float32(13.0)
	productStatus := "enabled"

	productMock := mock_application_interface.NewMockProductInterface(controller)
	productMock.EXPECT().GetId().Return(productId).AnyTimes()
	productMock.EXPECT().GetName().Return(productName).AnyTimes()
	productMock.EXPECT().GetPrice().Return(productPrice).AnyTimes()
	productMock.EXPECT().GetStatus().Return(productStatus).AnyTimes()

	productServiceMock := mock_application_interface.NewMockProductServiceInterface(controller)
	productServiceMock.EXPECT().Update(gomock.Any()).Return(productMock, nil).AnyTimes()

	expectedResult := fmt.Sprintf(
		cli.UpdateResultConst,
		productId,
		productName,
		productPrice,
		productStatus,
	)

	result, err := cli.Run(productServiceMock, "update", productId, productName, float32(productPrice))

	require.Nil(t, err)
	require.Equal(t, expectedResult, result)
}

func TestShouldReturnTheProperMessageWhenSuccessfullyEnableAProduct(t *testing.T) {
	controller := gomock.NewController(t)
	defer controller.Finish()

	productId := "uuid"
	productName := "Black and White T-shirt"
	productPrice := float32(13.0)
	productStatus := "enabled"

	productMock := mock_application_interface.NewMockProductInterface(controller)
	productMock.EXPECT().GetId().Return(productId).AnyTimes()
	productMock.EXPECT().GetName().Return(productName).AnyTimes()
	productMock.EXPECT().GetPrice().Return(productPrice).AnyTimes()
	productMock.EXPECT().GetStatus().Return(productStatus).AnyTimes()

	productServiceMock := mock_application_interface.NewMockProductServiceInterface(controller)
	productServiceMock.EXPECT().Enable(gomock.Any()).Return(productMock, nil).AnyTimes()

	expectedResult := fmt.Sprintf(
		cli.EnableResultConst,
		productId,
		productName,
		productPrice,
		productStatus,
	)

	result, err := cli.Run(productServiceMock, "enable", productId, "", float32(0.0))

	require.Nil(t, err)
	require.Equal(t, expectedResult, result)
}

func TestShouldReturnTheProperMessageWhenSuccessfullyDisableAProduct(t *testing.T) {
	controller := gomock.NewController(t)
	defer controller.Finish()

	productId := "uuid"
	productName := "Black and White T-shirt"
	productPrice := float32(13.0)
	productStatus := "enabled"

	productMock := mock_application_interface.NewMockProductInterface(controller)
	productMock.EXPECT().GetId().Return(productId).AnyTimes()
	productMock.EXPECT().GetName().Return(productName).AnyTimes()
	productMock.EXPECT().GetPrice().Return(productPrice).AnyTimes()
	productMock.EXPECT().GetStatus().Return(productStatus).AnyTimes()

	productServiceMock := mock_application_interface.NewMockProductServiceInterface(controller)
	productServiceMock.EXPECT().Disable(gomock.Any()).Return(productMock, nil).AnyTimes()

	expectedResult := fmt.Sprintf(
		cli.DisabledResultConst,
		productId,
		productName,
		productPrice,
		productStatus,
	)

	result, err := cli.Run(productServiceMock, "disable", productId, "", float32(0.0))

	require.Nil(t, err)
	require.Equal(t, expectedResult, result)

	// https://www.youtube.com/watch?v=W-ukSOhcrjo
}
