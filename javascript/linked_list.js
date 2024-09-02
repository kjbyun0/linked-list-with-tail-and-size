class LinkedList {
  constructor(head = null) {
    this.head = head;
    let index = 0;
    this.tail = this.iterate((curNode, count) => {
      if (curNode.next === null) {
        index = count;
        return true;
      }
    });
    this.size = this.tail === null ? 0 : index + 1;
  }

  iterate(callback) {
    let count = 0;
    let temp = this.head;

    while (temp !== null) {
      const result = callback(temp, count);

      if (result === true) {
        return temp;
      }

      ++count;
      temp = temp.next;
    }

    return this.head;
  }

  // print each node's value on its own line
  // use your iterate method to be DRY! Don't get caught in the code rain, brrr.
  print() {
    this.iterate(node => console.log(node.value));
  }

  // find the node with the target value and return it
  // if not found return null, use your iterate method to be DRY!
  find(target) {
    let result = null;

    this.iterate(node => {
      if (node.value === target) {
        result = node;

        return true;
      }
    });

    return result;
  }

  // add the node to the start of the list, no nodes should be removed
  addFirst(node) {
    node.next = this.head;
    this.head = node;
    if (this.tail === null)
      this.tail = node;
    this.size++;
  }

  // add node to end of list, no nodes should be removed
  // you may wish to use the iterate method
  addLast(node) {
    this.tail = node;
    this.size++;

    if (this.head === null) {
      this.head = node;
      return;
    }

    this.iterate(currNode => {
      if (currNode.next === null) {
        currNode.next = node;
        return true;
      }
    });

  }

  // remove the first Node in the list and update head
  // and return the removed node
  removeFirst() {
    const oldHead = this.head;

    if (this.head !== null) {
      if (this.tail === this.head)
        this.tail = null;
      this.head = this.head.next;
      this.size--;
    }

    return oldHead;
  }

  // remove the tail node, iterate may be helpful
  // return the node you just removed
  removeLast() {
    if (this.head === null || this.head.next === null) {
      return this.removeFirst();
    }

    let oldTail = null;

    this.iterate(node => {
      if (node.next.next === null) {
        oldTail = node.next;
        node.next = null;
        this.tail = node;
        this.size--;
        return true;
      }
    });

    return oldTail;
  }

  // replace the node at the given index with the given node
  replace(idx, node) {
    if (idx === 0) {
      this.removeFirst();
      this.addFirst(node);
      return node;
    }

    this.iterate((currNode, count) => {
      if (count === idx - 1) {
        node.next = currNode.next.next;
        currNode.next = node;
        if (node.next === null)
          this.tail = node;

        return true;
      }
    });

    return node;
  }

  // insert the node at the given index
  // no existing nodes should be removed or replaced
  insert(idx, node) {
    if (idx === 0) {
      this.addFirst(node);
      return;
    }

    this.iterate((currNode, count) => {
      if (count === idx - 1) {
        const oldNext = currNode.next;
        currNode.next = node;
        node.next = oldNext;
        if (node.next === null)
          this.tail = node;
        this.size++;

        return true;
      }
    });
  }

  // remove the node at the given index, and return it
  remove(idx) {
    if (idx === 0) {
      return this.removeFirst();
    }

    let oldNode = null;

    this.iterate((node, count) => {
      if (count === idx - 1) {
        oldNode = node.next;
        node.next = node.next.next;
        if (node.next === null)
          this.tail = node;
        this.size--;

        return true;
      }
    }); 

    return oldNode;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
}

class Node {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
  }
}

if (require.main === module) {
  let head = new Node('one', new Node('two', new Node('three', new Node('four'))));
  let list = new LinkedList(head);
  let emptyList = new LinkedList();
  let oneItemList = new LinkedList(new Node('just one'));

  console.log("");
  console.log("emptyList: ", emptyList);
  console.log("oneItemList: ", oneItemList);
  console.log("list: ", list);

  console.log("");
  console.log("Test - addFirst");
  emptyList.addFirst(new Node('one'));
  console.log("add first node: ", emptyList);
  emptyList.addFirst(new Node('two'));
  console.log("add second node: ", emptyList);

  console.log("");
  console.log("Test - addLast");
  emptyList = new LinkedList();
  emptyList.addLast(new Node('one'));
  console.log("add first node: ", emptyList);
  emptyList.addLast(new Node('two'));
  console.log("add second node: ", emptyList);

  console.log("");
  console.log("Test - removeLast");
  console.log("initial list: ", emptyList);
  emptyList.removeLast();
  console.log("remove last node 1: ", emptyList);
  emptyList.removeLast();
  console.log("remove last node 2: ", emptyList);

  console.log("");
  console.log("Test - removeFirst");
  emptyList.addFirst(new Node('one'));
  emptyList.addLast(new Node('two'));
  console.log("initial list: ", emptyList);
  emptyList.removeFirst();
  console.log("remove first node 1: ", emptyList);
  emptyList.removeFirst();
  console.log("remove first node 2: ", emptyList);

  // replace(idx, node)
  console.log("");
  console.log("Test - replace");
  emptyList.addFirst(new Node('one'));
  emptyList.addLast(new Node('two'));
  console.log("initial list: ", emptyList);
  emptyList.replace(1, new Node('replace last'));
  console.log("replace the last node: ", emptyList);
  emptyList.replace(0, new Node('replace first'));
  console.log("replace the first node: ", emptyList);

  // clear()
  console.log("");
  console.log("Test - clear");
  console.log("initial list: ", emptyList);
  emptyList.clear();
  console.log("clear: ", emptyList);

  // insert(idx, node)
  console.log("");
  console.log("Test - insert");
  console.log("initial list: ", emptyList);
  emptyList.insert(0, new Node('one'));
  console.log("insert one: ", emptyList);
  emptyList.insert(0, new Node('zero'));
  console.log("insert zero: ", emptyList);
  emptyList.insert(1, new Node('two'));
  console.log("insert two: ", emptyList);
  emptyList.insert(3, new Node('three'));
  console.log("insert three: ", emptyList);

  // remove(idx)
  console.log("");
  console.log("Test - remove");
  console.log("initial list: ", emptyList);
  emptyList.remove(3);
  console.log("remove three: ", emptyList);
  emptyList.remove(1);
  console.log("remove two: ", emptyList);
  emptyList.remove(1);
  console.log("remove one: ", emptyList);
  emptyList.remove(0);
  console.log("remove zero: ", emptyList);
}

module.exports = {
  Node, LinkedList
};
