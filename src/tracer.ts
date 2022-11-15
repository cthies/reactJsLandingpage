import ddTrace from 'dd-trace';

const tracer = ddTrace.init();
tracer.use('express');
tracer.use('next');
tracer.use('fs');
tracer.use('http');
tracer.use('dns');

export default tracer;
