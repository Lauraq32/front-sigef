import http from '@/Api/http-common'

class Files {
    getFiles({tag, name}) {
        let query = '';
        if (name) {
            query = `?name=${name}`;
        };
        if (tag) {
            const tags = Object.keys(tag).reduce((list, key) => {
                list.push(`tag=${tag[key]}`);
                return list
            }, []);
            
            query = query ? `${query}&${tags.join('&')}` : `?${tags.join('&')}`;
            console.log({query, tags});
        }
        return http.get(`files${query}`).then((response) => response.data.data)
    }

    getFileById(id) {
        return http.get(`files/${id}`, 
        {
            responseType: 'blob'
        }).then((response) => {
            return URL.createObjectURL(response.data);
        })
    }
}


export default new Files();