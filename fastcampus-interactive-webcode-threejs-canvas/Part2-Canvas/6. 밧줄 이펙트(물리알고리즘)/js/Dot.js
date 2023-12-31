import { randomNumBetween } from './utils.js';
import Vector from './Vector.js';

export default class Dot {
    constructor(x, y) {
        this.pos = new Vector(x, y);
        this.oldPos = new Vector(x, y);

        this.radius = 1;
        this.friction = 0.97;
        this.gravity = new Vector(0, 0.6);
        this.mass = 1;

        this.pinned = false;

        this.distMouse = 1000;

        this.lightImg = document.querySelector('#light-img');
        this.lightWidth = 15;
        this.lightHeight = 15;
    }

    update(mouse) {
        if (this.pinned) return;

        let vel = Vector.sub(this.pos, this.oldPos);
        vel.mult(this.friction);

        this.oldPos.setXY(this.pos.x, this.pos.y);
        vel.add(this.gravity);
        this.pos.add(vel);

        let { x: dx, y: dy } = Vector.sub(this.pos, mouse.pos);

        this.distMouse = Math.sqrt(dx * dx + dy * dy);

        if (this.distMouse > mouse.radius + this.radius) return; // 반지름 밖에 있을 경우 아래 코드 생략
        const direction = new Vector(dx / this.distMouse, dy / this.distMouse); // 점의 위치에서 마우스 위치로 이동하기 위한 벡터

        let force = (mouse.radius - this.distMouse) / mouse.radius; // 이동하기 위한 힘

        if (force < 0) force = 0;
        if (force < 0.6) {
            this.pos.sub(direction.mult(force).mult(0.0001));
        } else {
            this.pos.setXY(mouse.pos.x, mouse.pos.y); // 충분히 가까우면 고정
        }
    }

    drawLight(ctx) {
        ctx.drawImage(
            this.lightImg,
            this.pos.x - this.lightWidth / 2,
            this.pos.y - this.lightHeight / 2,
            this.lightWidth,
            this.lightHeight,
        );
    }

    draw(ctx) {
        ctx.fillStyle = '#aaa';
        ctx.fillRect(this.pos.x - this.radius, this.pos.y - this.radius, this.radius * 2, this.radius * 2);
    }
}
