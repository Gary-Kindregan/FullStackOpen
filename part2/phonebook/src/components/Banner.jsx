const Banner = ({ config }) => {
    if (config === null) {
        return null
    }

    const bannerStyle = {
        color: config.isErrorBanner ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    return (
        <div className="banner" style={bannerStyle}>
            {config.message}
        </div>
    )
}

export default Banner