const inspect = require('util').inspect;

export default (data: any, depth = 4) => {
    const value = inspect(data, {
        depth,
        colors: true,
        sorted: true,
    });

    process.stdout.write(`${value}\n`);
};
