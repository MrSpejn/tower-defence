export default function Publisher(eventTypes) {
	return function (className) {
		const handlers = {};

		className.prototype.on = function on(event, handler) {
			if (!eventTypes.includes(event)) throw `Subscriber ${className} does not support ${event} event`;
			if (!handlers[event])  handlers[event] = [];
			handlers[event].push(handler);
		};

		className.prototype.dispatch = function dispatch(event, ...args) {
			if (!eventTypes.includes(event)) throw `Subscriber ${className} does not support ${event} event`;
			if (!handlers[event]) return;
			handlers[event].forEach(handler => handler.apply(null, args));
		};
	};
}
