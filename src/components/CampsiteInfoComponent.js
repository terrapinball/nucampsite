import React, { Component } from 'react'
import { Card, CardImg, CardBody, CardText, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

  function RenderCampsite({campsite}) {
        
        return (
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );

    }

    function RenderComments({comments, addComment, campsiteId}) {
        if (comments) {
            return (
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map(comment => 
                        <div key={comment.id}>
                            <div>{comment.text}</div>
                            <div>{comment.author} : {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} </div>
                            <br />
                        </div>
                    )}
                    <CommentForm campsiteId={campsiteId} addComment={addComment} />
                </div>
            );
        } return <div />
    }

    function CampsiteInfo(props) {
        if (props.campsite) {
            return (
                <div className="container">
                    <div className="row m-2">
                        <h2>{props.campsite.name}</h2>
                    </div>
                    <div className="row">
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments
                            comments={props.comments}
                            addComment={props.addComment}
                            campsiteId={props.campsite.id}
                        />
                    </div>
                    <div className="row">
                        <div className="col">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/directory">Home</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                    </div>
                </div>
            )
        }
        return <div />
    }


    class CommentForm extends Component {

        constructor(props) {
            super(props);
            this.state = {
                isModalOpen: false,
                rating: '',
                author: '',
                comment: ''
            };

            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }

        handleSubmit(values) {
            this.toggleModal();
            this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
            alert("State is: " + JSON.stringify(values));
        }

        render() {
            return(
                <div>
                    <Button outline onClick={this.toggleModal}>
                        <i className="fa fa-pencil" /> Submit Comment
                    </Button>

                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                                <LocalForm onSubmit={values => this.handleSubmit(values)}>
                                        <div className="group col-12">
                                            <Label htmlFor="rating" md={2}>Rating</Label>
                                            <Col md={12}>
                                                <Control.select model=".rating" id="rating" name="rating"
                                                        className="form-control">
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </Control.select>
                                            </Col>
                                        </div>
                                        <div className="group col-12">
                                            <Label htmlFor="author" md={10}>Your Name</Label>
                                            <Col md={12}>
                                                <Control.text model=".author" id="author" name="author"
                                                    placeholder="Your Name" 
                                                    className="form-control"
                                                    validators={{
                                                        minLength: minLength(2),
                                                        maxLength: maxLength(15)
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".author"
                                                    show="touched"
                                                    component="div"
                                                    messages={{
                                                        minLength: 'Must be at least 2 characters',
                                                        maxLength: 'Must be 15 characters or less'
                                                    }}
                                                />
                                            </Col>
                                        </div>
                                        <div className="group col-12">
                                            <Label htmlFor="comment" md={2}>Comment</Label>
                                            <Col md={12}>
                                                <Control.textarea model=".comment" id="comment" name="comment"
                                                    rows="6"
                                                    className="form-control"
                                                />
                                            </Col>
                                        </div>
                                        <div className="group">
                                            <Col md={12}>
                                                <Button type="submit" color="primary">
                                                    Submit
                                                </Button>
                                            </Col>
                                        </div>
                                </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            );
        }
    }


export default CampsiteInfo;