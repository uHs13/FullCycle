package portEvent

type EventHandlerInterface interface {
	Handle(event EventInterface) error
}
