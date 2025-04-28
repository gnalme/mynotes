import { Card, Typography, Divider, Button  } from 'antd';
import { deleteNote } from "../services/note";
import moment from 'moment';

const { Text, Title } = Typography;

export default function Note({title, description, createdAt, id, onDelete}) {
    const handleDelete = async () => {
        const confirmed = window.confirm("Точно удалить?");
        if (confirmed) {
          const success = await deleteNote(id);
          if (success) {
            onDelete(id); // сообщаем родителю, чтобы он удалил заметку из списка
          }
        }
      };

    return (
        <Card style={{ backgroundColor: " #E7EFEE" }}>
            <Title level={5}>{title}</Title>
            <Divider />
            <Text>{description}</Text>
            <Divider />
            <div className="card-footer flex justify-between">
                {moment(createdAt).format("DD/MM/YYYY h:mm:ss") }
                <Button color="danger" variant="solid" onClick={handleDelete}>Delete</Button>
            </div>
            
        </Card>
    )
}