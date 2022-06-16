const middleware = (validate) => {
    return (req, res, next) => {
        const { error } = validate(req.body);
        console.log('dot.error:', error);
        if(error) return res.status(404).send(error.details[0].message)
        next();
    }
}
export default middleware;