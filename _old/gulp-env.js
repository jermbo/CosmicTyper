const yargs = require('yargs').argv;

module.exports = () => {
    // const siteInstanceName = 'mysite.local';
    const siteInstanceName = './';
    return {
        srcPath : './src',
        buildPath: './build',
        port: (yargs.port) ? yargs.port : 3000,
        devURL: (yargs.url) ? yargs.url : `${siteInstanceName}`
    }
}