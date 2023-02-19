import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import { Modal, Input } from 'antd'

const AddItem = () => {

  //States
  const [editingProducer, setEditingProducer] = useState(false);
  const [editingActor, setEditingActor] = useState(false);
  const [temp, setTemp] = useState("");
  const [producers, setProducers] = useState(['prod1', 'prod2']);
  const [actors, setActors] = useState(['actor1', 'actor2']); //this is for adding new actors
  const [input, setInput] = useState({
    name: '',
    year: '',
    imgUrl: '',
    producer: '',
    actors: '',
  });
  const [actorsInput, setActorsInput] = useState([]); //this is for taking inputs



  //Setting options
  const producersOptions = [], actorsOptions = [];
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
    actorsInput.map(ele => {
      if (ele == e.target.value) {
        console.log("hey");
        setActorsInput([]);
      }
    })
    actors.map(ele => {
      if (ele == e.target.value) {
        console.log("hey");
        setActors([]);
      }
    })

    setActorsInput((pre) => {
      return [...pre, e.target.value]
    })
    setActors((pre) => {
      return [...pre, e.target.value]
    })
  }



  //get the data from params
  const { id } = useParams("");
  const getData = async (e) => {

    try {
      const res = await fetch(`/edit/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await res.json();

      if (res.status === 404 || !data) {
        alert("error");
      }
      else {
        setInput(data);
        setActors(data.actors);
        console.log("data got");
      }

    } catch (error) {
      console.log("error is: " + error.message);
    }
  }

  useEffect(() => {
    getData();
  }, [])





  //save edited input to DB
  const updateInput = async (e) => {
    e.preventDefault();

    const { name, year, imgUrl, producer } = input;
    const acts = actors;
    
    try {
      const res2 = await fetch(`/edit/${id}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          year: year,
          imgUrl: imgUrl,
          producer: producer,
          actors: acts
        })
      });

      const data2 = await res2.json();
      console.log(data2);

      if (res2.status === 404 || !data) {
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
          <input name='imgUrl' className='addInput' placeholder='Movie Image URL (Portrait)' value={input.imgUrl} onChange={setData} required/>

          <select name='producer' className='addInput' style={{ height: 'max-content' }} value={input.producer} onChange={setData}>
            <option value="-" selected>Movie Producer</option>
            {producersOptions}
          </select>
          <button type='button' className='addBtn2' onClick={onEditProducer}>Add Producer</button>
          <select name='actors' className='addInput' multiple style={{ height: 'max-content' }} value={actors} onChange={setDataActors}>
            <option value="saab" disabled>Movie Actors</option>
            {actorsOptions}
          </select>
          <button type='button' className='addBtn2' onClick={onEditActor}>Add Actor</button>
          <br />
          <button type='submit' onClick={updateInput} className='addBtn'>UPDATE</button>
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