import { endpoints } from '../../constants'
import api from '../api'


const uploadImage = ({ file }: { file: any }) => {
    const res = api.post(endpoints.server.fileUpload.image, file)
    return res;
}


export default uploadImage;