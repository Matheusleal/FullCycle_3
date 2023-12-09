package cli_test

import (
	"fmt"
	"testing"

	"github.com/MatheusLeal/go-hexagonal/adapters/cli"
	mock_application "github.com/MatheusLeal/go-hexagonal/application/mocks"
	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/require"
)

func TestRun(t *testing.T) {
	ctlr := gomock.NewController(t)
	defer ctlr.Finish()

	productName := "Product 1"
	productPrice := 10.0
	productStatus := "enabled"
	productId := "abc"

	productMock := mock_application.NewMockProductInterface(ctlr)

	productMock.EXPECT().GetId().Return(productId).AnyTimes()
	productMock.EXPECT().GetName().Return(productName).AnyTimes()
	productMock.EXPECT().GetPrice().Return(productPrice).AnyTimes()
	productMock.EXPECT().GetStatus().Return(productStatus).AnyTimes()

	serviceMock := mock_application.NewMockProductServiceInterface(ctlr)

	serviceMock.EXPECT().Get(productId).Return(productMock, nil).AnyTimes()
	serviceMock.EXPECT().Create(productName, productPrice).Return(productMock, nil).AnyTimes()
	serviceMock.EXPECT().Enable(productMock).Return(productMock, nil).AnyTimes()
	serviceMock.EXPECT().Disable(productMock).Return(productMock, nil).AnyTimes()

	expectedResult := fmt.Sprintf("Product ID %s with the name %s has been created with the price %f and status %s",
		productId, productName, productPrice, productStatus)

	result, err := cli.Run(serviceMock, "create", "", productName, productPrice)
	require.Nil(t, err)
	require.Equal(t, expectedResult, result)

	expectedResult = fmt.Sprintf("Product %s has been enabled", productName)

	result, err = cli.Run(serviceMock, "enable", productId, "", 0.0)
	require.Nil(t, err)
	require.Equal(t, expectedResult, result)

	expectedResult = fmt.Sprintf("Product %s has been disabled", productName)

	result, err = cli.Run(serviceMock, "disable", productId, "", 0.0)
	require.Nil(t, err)
	require.Equal(t, expectedResult, result)

	expectedResult = fmt.Sprintf("Product ID: %s\nName: %s\nPrice: %f\nStatus: %s", productId, productName, productPrice, productStatus)

	result, err = cli.Run(serviceMock, "get", productId, "", 0.0)
	require.Nil(t, err)
	require.Equal(t, expectedResult, result)
}
