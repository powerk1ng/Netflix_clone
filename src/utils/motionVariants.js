export const container = {
    hidden: {
        opacity: 0
    },
    show: {
        opacity: 1,
        transition: {
            delay: 0.1,
            staggerChildren: 0.3,
        }
    }
}

export const containerMain = {
    hidden: {
        opacity: 0
    },
    show: {
        opacity: 1,
        transition: {
            delay: 0.05,
            staggerChildren: 0.02,
        }
    }
}


export const item = {
    hidden: {
        opacity: 0
    },
    show: {
        opacity: 1
    }
}


export const likeBtnMotion = {
    hidden: {
        opacity: 0,
        y: '100%'
    },
    show: {
        opacity: 1,
              y: 0,
              transition: {
                delay: 0.1,
                duration: 0.4,
                type: "spring",
                damping: 11,
              },
    }
}