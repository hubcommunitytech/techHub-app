export class Count {
  total: number;

  constructor(t: Count) {
    this.total = t.total
  }
}

export class Project {
  _id: string;
  title: string;
  description: string;
  link_aplication: string;
  photo: string;

  constructor(p: Partial<Project>) {
    this._id = p._id || '';
    this.title = p.title || '';
    this.description = p.description || '';
    this.link_aplication = p.link_aplication || '';
    this.photo = p.photo || '';
  }
}
