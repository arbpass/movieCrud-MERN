import React, { useState } from 'react'
import Navbar from './Navbar'
import { Modal, Input } from 'antd'

const AddItem = () => {

  //States
  const [editingProducer, setEditingProducer] = useState(false);
  const [editingActor, setEditingActor] = useState(false);
  const [temp, setTemp] = useState("");
  const [producers, setProducers] = useState(['prod1', 'prod2']);
  const [actors, setActors] = useState(['actor1', 'actor2', 'actor3']); //this is for adding new actors
  const [input, setInput] = useState({
    name: '',
    year: '',
    image: '',
    producer: '',
  });
  const [actorsInput, setActorsInput] = useState([]); //this is for taking inputs



  //Setting options
  const producersOptions = [], actorsOptions = [];
  producersOptions.push(<option value="-" selected>Movie Producer</option>);
  producers.forEach(element => {
    producersOptions.push(<option value={element}>{element}</option>);
  });
  actors.forEach(element => {
    actorsOptions.push(<option value={element}>{element}</option>);
  });


  //Editing
  function onEditProducer(element) {
    setEditingProducer(true);
  }
  function onEditActor(element) {
    setEditingActor(true);
  }
  function resetEdit(element) {
    setEditingProducer(false);
    setEditingActor(false);
  }


  //Set states of inputs
  const setData = (e) => {
    const { name, value } = e.target;
    setInput((pre) => {
      return {
        ...pre,
        [name]: value,
      }
    })
  }

  const setDataActors = (e) => {
    console.log(e.target.value);

    actorsInput.map(ele => {
      if (ele == e.target.value) {
        console.log("hey");
        setActorsInput([]);
      }
    })

    setActorsInput((pre) => {
      return [...pre, e.target.value]
    })
  }


  //add input to DB
  const addInput = async (e) => {
    e.preventDefault();

    const { name, year, image, producer } = input;
    const actors = actorsInput;
    console.log(name); console.log(actors);

    try {
      const res = await fetch('addItem', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          year: year,
          imgUrl: image,
          producer: producer,
          actors: actors
        })
      });

      const data = await res.json();
      console.log(data);

      if (res.status === 404 || !data) {
        alert("error");
      }
      else {
        alert("data added");
      }

    } catch (error) {
      console.log("error is: " + error.message);
    }
  }


  return (
    <>
      <div className='home'>
        <form className='form'>
          <input name='name' className='addInput' placeholder='Movie Name' value={input.name} onChange={setData} required />
          <input name='year' className='addInput' placeholder='Movie Year' value={input.year} onChange={setData} required />
          <input name='image' className='addInput' placeholder='Movie Image URL (Portrait)' value={input.image} onChange={setData} />

          <select name='producer' className='addInput' style={{ height: 'max-content' }} value={input.producer} onChange={setData}>
            {producersOptions}
          </select>
          <button type='button' className='addBtn2' onClick={onEditProducer}>Add Producer</button>
          <select name='actors' className='addInput' multiple style={{ height: 'max-content' }} value={actorsInput} onChange={setDataActors}>
            <option value="saab" disabled>Movie Actors</option>
            {actorsOptions}
          </select>
          <button type='button' className='addBtn2' onClick={onEditActor}>Add Actor</button>
          <br />
          <button type='submit' onClick={addInput} className='addBtn'>ADD</button>
        </form>


      </div>

      <Modal
        title='Add Producer'
        open={editingProducer}
        okText='Save'
        onCancel={() => resetEdit()}
        onOk={() => {
          setProducers(pre => {
            return [...pre, temp];
          });
          setTemp("");
          resetEdit();
        }}
      >
        <Input required onChange={(e) => { setTemp(e.target.value) }} />
      </Modal>

      <Modal
        title='Add Actor'
        open={editingActor}
        okText='Save'
        onCancel={() => resetEdit()}
        onOk={() => {
          setActors(pre => {
            return [...pre, temp];
          });
          setTemp("");
          resetEdit();
        }}
      >
        <Input required onChange={(e) => { setTemp(e.target.value) }} />
      </Modal>
    </>
  )
}

export default AddItem