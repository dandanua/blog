---
title: The Spin of a Human Body
redirect_from:
  - /posts/the-spin-of-a-human-body/
math: true
--- 

## 1. Introduction

Most people know that a rotation of 360° degrees turns an object back to its starting position, independently of the rotation direction. But this is not quite true in particle physics. You may have heard that an electron has a half-integer spin ±1/2 and we have to rotate it twice to return it back where it was. But particle physics isn't something everyone familiar with, you have to grasp a lot of knowledge to understand it even partially. 

Here I want to present a tangible explanation of why a double rotation of 720° is natural for macro objects as well (in particular, for a human body), and what can be defined as a spin of a macro body. If you're reading this on a mobile device then you can find a little demonstration in the end. 


## 2. Belt tricks

There are already many interesting macro demonstrations of why double rotation is important. Those are known as Dirac's belt trick, the plate trick, or the Balinese cup trick – [https://en.wikipedia.org/wiki/Plate_trick](https://en.wikipedia.org/wiki/Plate_trick). 

Some nice illustrations: 

<iframe src="https://www.youtube.com/embed/O7wvWJ3-t44" allowfullscreen></iframe>

<iframe src="https://www.youtube.com/embed/Nat-EsReXtQ" allowfullscreen></iframe>

<iframe src="https://www.youtube.com/embed/JDJKfs3HqRg" allowfullscreen></iframe>

<iframe src="https://www.youtube.com/embed/LLw3BaliDUQ" allowfullscreen></iframe>

<!-- https://www.youtube.com/watch?v=O7wvWJ3-t44

https://www.youtube.com/watch?v=Nat-EsReXtQ

https://www.youtube.com/watch?v=JDJKfs3HqRg

https://www.youtube.com/watch?v=LLw3BaliDUQ -->

Those illustrations are fascinating, but they don't explain what's going on :)

In short, it looks like a single 360° rotation changes the positional state of an object to it's indistinguishable dual. While a second full rotation turns it back to the original state. 

Now, this is actually what we'll call a spin. If an object in its original state after series of rotations then we say that its spin is 0. If the state is dual then we say that the spin is 1 (we don't follow ±1/2 conventions of particle physics here). Note that the spin is not an absolute quantity, it's always relative to the initial state, which can be chosen arbitrary. 

But how to compute it in general? A series of body rotations can be very complex. 


## 3. Mathematics

First of all, let's recall what's an ordinary 3D rotation. By Euler's theorem any possible state after series of rotations (with a fixed center) can be achieved by a single rotation around an axis of rotation. For simplicity, consider the unit sphere with the center at \\((0,0,0)\\). The axis of rotation can be represented by a unit vector $$(a_x,a_y,a_z)$$. The angle $$\theta \in [0,2\pi]$$ describes how much we rotate the body around the axis (clockwise if we look in the direction $$(a_x,a_y,a_z)$$). The angles $$\theta=0$$ and $$\theta=2\pi$$ are indistinguishable for us. 

There are different ways to represent rotations, but practice showed that quaternions is the most simple and reliable (no gimbal lock) solution.

[Quaternions](https://en.wikipedia.org/wiki/Quaternion) is a natural extention of complex numbers. While complex numbers are constructed around imaginary unit $$i$$, which is the square root of $$-1$$, the quaternions have three such basic units $$i,j,k$$. The defining relations for them are 
\\[
i^2 = j^2 = k^2 = ijk = -1
\\]
and every quaternion has form $$q=a+bi+cj+dk$$, where $$a,b,c,d \in \mathbb{R}.$$ Unit quaternions are those with the condition $$a^2+b^2+c^2+d^2=1.$$ 

We can add and multiply them (as well as substract and divide). The product of unit quaternions is always a unit quaternion. But note that in contrast to complex numbers, multiplication of quaternions is not commutative, i.e. $$q_1q_2 \neq q_2q_1$$ in general.  

To represent a spatial rotation consider the quaternion 
\\[
  q = \text{cos}(\theta/2) + \text{sin}(\theta/2)(a_xi + a_yj + a_zk)
\\]
where $$(a_x,a_y,a_z)$$ and $$\theta$$ we've defined earlier. 
You can check that $$q$$ is a unit quaternion. 

Now, to calculate the effect of this rotation on an arbitrary vector $$v = (v_x, v_y, v_z)$$ we take the  quaternion $$p = v_xi+v_yj+v_zk$$ and compute the conjugation of it by $$q$$:
\\[
p^\prime = qpq^{-1},
\\]
where $$q^{-1}=q^*=$$
\\[
= \text{cos}(\theta/2) - \text{sin}(\theta/2)(a_xi + a_yj + a_zk) 
\\] 
in this case. 

The result will be equal to 
\\[
p^\prime = w_xi+w_yj+w_zk
\\]
for some numbers $$w_x,w_y,w_z$$. 

The vector $$w=(w_x,w_y,w_z)$$ is the final position of vector $$v$$ after rotation represented by $$q$$. And that's it. 

---

From this algorithm we can see that the composition of two rotations is the product of corresponding quaternions $$q_2q_1$$ (the second rotation is on the left). Note that the relation between 3D rotations and unit quaternions also goes backwards, i.e. for any unit quaternion there is a corresponding rotation (which is unique for a given $$q$$).

But observe a strange thing. Quaternions $$q$$ and $$-q$$ have the same effect on an arbitrary vector $$p = v_xi+v_yj+v_zk$$ since we always have $$(-q)p(-q^{-1}) = qpq^{-1}$$. In particular, the quaternion $$q=-1$$ doesn't affect vectors $$p = v_xi+v_yj+v_zk$$ at all. So, for every 3D rotation (including stationary) there are two corresponding quaternions (and only two, in fact). 

From the first sight you might think that it's some mathematical side-effect, which doesn't have much meaning. 
We could assume that quaternions $$q$$ and $$-q$$ are equivalent for all practical purposes, that's probably what game engines do. 

But let's take a bit different look. Let's assume that only $$q=1$$ corresponds to the stationary rotation. Likewise, any tiny (i.e. almost stationary) rotation corresponds to a quaternion that is close to $$1$$, not $$-1$$. Can we continue this and suitably take only half of all unit quaternions for consideration? Apparently not! 
Consider, for example, the series of tiny rotations  $$q_t=q=\text{cos}(\pi/100) + \text{sin}(\pi/100)j \approx 1$$, for $$t=1,..,100$$. Then their product is $$q_{100}...q_1=q^{100}=-1$$. It's $$-1$$ even though all of them are close to $$1$$! 

This observation gives a hint to how we can compute the spin for an arbitrary series of rotations. We can think that any rotation is a series of very tiny rotations. In reality, an object never flips instantly. It always has a history of small rotational steps. For every tiny rotation we take the quaternion that is close to $$1$$ (not $$-1$$) and then just compute the product of all of them. The final result will be the quaternion that corresponds to the total rotation, but with a definite sign! If the rotational steps were small enough then the resulting sign won't change if we consider even smaller steps. In other words, we just compute an integral over rotational directions. 

## 4. The demonstration

If you're reading this on a mobile device then the following HTML5 code can work for you. Modern mobile devices have sensors (a compass and a gyroscope) that help them realize their 3D rotation in space. The details about orientational representation you can find [here](https://developers.google.com/web/fundamentals/native-hardware/device-orientation/) and [here](https://developers.google.com/web/updates/2016/03/device-orientation-changes). 

Note that sensors don't record all history. Thus, by reading a single shot of absolute orientational data we can't have any preference over picking the sign of the corresponding quaternion. But we can use software to keep track of the change of orientation. In this way we can keep track of the spin of the device, as explained above. 

You can try to rotate the device or yourself while holding it and observe how the spin changes. 

<script src="https://cdn.jsdelivr.net/npm/quaternion@1.2.1/quaternion.min.js"></script>

<script src="{{ base.url | prepend: site.url }}/assets/js/post/spin.js"></script>

<div style="text-align: center;">  
  <br>
  <b>Euler angles:</b>
  <div id="angles"></div>
  <b>Quaternion:</b>
  <div id="quaternion"></div>
   <b>Spin:</b>
  <div id="spin"></div>
  <br>
</div>

The initial rotational state is the one where Earth coordinate frame and device coordinate frame coincide (i.e. a phone is pointing to North with display up). But assume that the initial spin is random.
This is because we have the freedom of picking the sign of initial quaternion when the script starts working (though we actually choose the sign in such a way that initial $$q$$ is closer to $$1$$).  

Note that the displayed value of the spin is a projection, so it's unstable when the device is far from the initial orientation (e.g. a phone pointing to South). 


## 5. Conclusions

I hope you're convinced now that 360° degrees rotation isn't really turn you back to the same position – it changes your spin to the opposite. An interesting conclusion is that, in theory, you can keep track of the spin of your body through your entire life, right back where you've started!