package interfaces

type EventHandlerInterface interface {
	Handle(event EventInterface) error
}
