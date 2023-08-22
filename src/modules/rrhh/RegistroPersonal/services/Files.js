import http from '@/Api/http-common';

class Files {
	getFiles({ tag, name }) {
		let query = '';
		if (name) {
			query = `?name=${name}`;
		}
		if (tag) {
			const tags = Object.keys(tag).reduce((list, key) => {
				list.push(`${key}=${tag[key]}`);
				return list;
			}, []);

			query = query ? `${query}&${tags.join('&')}` : `?${tags.join('&')}`;
		}
		return http.get(`files${query}`);
	}

	getFileById(id) {
		return http
			.get(`files/${id}`, {
				responseType: 'blob',
			})
			.then((response) => {
				return URL.createObjectURL(response.data);
			});
	}

	getEmployeeIdentityImage(tags) {
		return this.getFiles({
			tag: tags,
		}).then((files) => {
			return this.getFileById(files.pop().id);
		});
	}

	saveFile(formData) {
		return http
			.post(`files`, formData, {
				headers: {
					...http.defaults.headers,
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((response) => {
				return response;
			});
	}
}

export default new Files();
