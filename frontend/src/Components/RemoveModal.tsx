import { Button, Modal, ScrollView, Text } from "native-base";

interface RemoveModalProps {
  isOpen: boolean
  onClose: () => void
  onCancel: () => void
  onRemove: () => void
  title: string
  description: string
}

export function RemoveModal({isOpen, onClose, onCancel, onRemove, title, description}: RemoveModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
    <Modal.Content>
      <Modal.CloseButton />
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>
        <ScrollView>
          <Text>
            {description}
          </Text>
        </ScrollView>
      </Modal.Body>
      <Modal.Footer>
        <Button.Group space={2}>
          <Button variant="ghost" colorScheme="blueGray" onPress={onCancel}>
            Cancelar
          </Button>
          <Button colorScheme="red" onPress={onRemove}>
            Remover
          </Button>
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  </Modal>
  )
}