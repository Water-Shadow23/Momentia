


export const OuterBuilder = (setState) => ({
    addOuterLike: (userId) => {
        setState((preData) => {
            preData.likes.push(userId);

            return { ...preData }
        });
    },
    addOuterSave: () => {
        setState((preData) => {
            preData.isSaved = true;
            return { ...preData }
        });
    },
    addOuterComment: () => {
        setState((preData) => {
            preData.comments = preData.comments + 1;
            return { ...preData }
        });
    },
    removeOuterComment: () => {
        setState((preData) => {
            preData.comments = preData.comments - 1;
            return { ...preData }
        });
    },
    removeOuterLike: (userId) => {
        setState((preData) => {
            preData.likes = preData.likes.filter(likeId => likeId !== userId);

            return { ...preData }
        });
    },
    removeOuterSave: (postId) => {
        setState((preData) => {
            preData = preData.filter(post => post.id !== postId);
            return [...preData]
        });
    },

})

export function setOuterData(setData) {

    function addOuterComment(postId) {
        setData((preDatas) => {

            for (let key in preDatas) {
                if (preDatas[key].id === postId) {
                    preDatas[key].comments = preDatas[key].comments + 1;
                    break;
                }

            }
            return { ...preDatas }
        });
    }
    function addOuterLike(postId, userId) {
        setData((preDatas) => {
            for (let key in preDatas) {
                if (preDatas[key].id === postId) {
                    preDatas[key].likes.push(userId);
                    break;
                }
            }
            return { ...preDatas }
        });
    }
    function removeOuterLike(postId, userId) {
        setData((preDatas) => {
            for (let key in preDatas) {
                if (preDatas[key].id === postId) {
                    preDatas[key].likes = preDatas[key].likes.filter((id) => id !== userId);
                    break;
                }
            }
            return { ...preDatas }
        });
    }
    function removeOuterComment(postId) {
        setData((preData) => {
            for (let key in preData) {
                if (preData[key].id === postId) {
                    preData[key].comments = preData[key].comments - 1;
                    break;
                }
            }
            return { ...preData }
        });
    }

    return {
        addOuterComment,
        addOuterLike,
        removeOuterLike,
        removeOuterComment
    }
}


