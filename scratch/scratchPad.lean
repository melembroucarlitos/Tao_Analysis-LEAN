namespace hidden

-- myNatural Numbers
-- 2.1.1
inductive myNat : Type
  | zero : myNat
  | succ : myNat → myNat

-- Can these be proven?? Or must they be axioms??

-- Axiom 2.1 (0 is a myNatural number)
-- Axiom 2.2 (If n is a myNatural number, n++ is also a myNatural number)
-- Axiom 2.3 (For all n, n++ != 0)
-- Axiom 2.4 (n != m -> n++ != m++)
-- Axiom 2.5 (Mathematical Induction)

-- 2.2.1
def add (m n : myNat) : myNat :=
  myNat.rec_on m n (λ a add_m_n, myNat.succ add_m_n)

-- 2.2.7
def positive (n : myNat) : Prop :=
  ¬(n = myNat.zero)
  -- Untested

-- 2.2.11 Orderin (Untested)
def lt (m n: myNat) : Prop :=
  ∃ r: myNat, n = add m r

def leq (m n: myNat) : Prop :=
  (lt m n) ∨ (m = n)

def gt (m n: myNat) : Prop :=
  ∃ r: myNat, m = add n r

def geq (m n: myNat) : Prop := 
  (gt m n) ∨ (m = n)

-- 2.3.1
def multiply (m n : myNat) : myNat :=
  myNat.rec_on m myNat.zero (λ a mult_m_n, add n mult_m_n)

-- 2.3.11
def exponantiate (m n : myNat) : myNat :=
  myNat.rec_on n (myNat.succ myNat.zero) (λ a exp_m_n, multiply exp_m_n m)


--TPIL

-- Intensional equality
theorem zero_add (n : myNat) : add myNat.zero n = n := rfl
theorem succ_add (m n : myNat) : add (myNat.succ m) n = myNat.succ (add m n) := rfl

theorem add_zero (m : myNat) : add m myNat.zero = m :=
  myNat.rec_on m
    (show add myNat.zero myNat.zero = myNat.zero, from rfl)
    (assume m,
     assume ih: add m myNat.zero = m,
     show add (myNat.succ m) myNat.zero = (myNat.succ m), from
     calc
       add (myNat.succ m) myNat.zero = myNat.succ (add m myNat.zero) : rfl
       ...                           = myNat.succ m                  : by rw ih
    )


theorem add_succ (m n : myNat) : add m (myNat.succ n) = myNat.succ (add m n) :=
  myNat.rec_on m
    (show add myNat.zero (myNat.succ n) = myNat.succ (add myNat.zero n), from rfl)
    (assume m,
     assume ih: add m (myNat.succ n) = myNat.succ (add m n),
     show add (myNat.succ m) (myNat.succ n) = myNat.succ (add (myNat.succ m) n), from
     calc
       add (myNat.succ m) (myNat.succ n) = myNat.succ (add m (myNat.succ n)) : rfl
       ...                               = myNat.succ (myNat.succ (add m n)) : by rw ih
    )

-- Two ways of Having this be one liners...
--I don't quite understand these tactic rewrites, come back and check on them
theorem zero_add' (n : myNat) : add n myNat.zero = n :=
  myNat.rec_on n rfl (λ n ih, by rw [succ_add, ih])

theorem zero_add'' (n : myNat) : add n myNat.zero = n :=
  myNat.rec_on n rfl (λ n ih, by simp only [succ_add, ih])

theorem add_assoc (m n k: myNat): add (add m n) k = add m (add n k) :=
  myNat.rec_on k
    (show add (add m n) myNat.zero = add m (add n myNat.zero), from
      calc
      add (add m n) myNat.zero = add m n : by apply add_zero
      ...                      = add m (add n myNat.zero) : by rw add_zero
    )
    (assume k,
     assume ih: add (add m n) k = add m (add n k),
     show add (add m n) (myNat.succ k) = add m (add n (myNat.succ k)), from
       calc
       add (add m n) (myNat.succ k) = myNat.succ (add (add m n) k)   : by apply add_succ
       ...                          = myNat.succ (add m (add n k))   : by rw ih
       ...                          = add m (myNat.succ (add n k))   : by rw ←add_succ -- This also works without the left arrow, I feel like it shouldn't
       ...                          = add m (add n (myNat.succ k))   : by rw ←add_succ
    ) 

-- Add_assoc one liner

-- Add_comm
theorem add_comm (m n : myNat): add m n = add n m :=
  myNat.rec_on m
    (show add myNat.zero n = add n myNat.zero, by rw [add_zero, zero_add])
    (assume m,
     assume ih: add m n = add n m,
     show add (myNat.succ m) n = add n (myNat.succ m), from
     calc
       add (myNat.succ m) n = myNat.succ (add m n) : rfl
       ...                  = myNat.succ (add n m) : by rw ih 
       ...                  = add n (myNat.succ m) : by rw ←add_succ
    )

-- Add_comm one liner


--TPIL


-- Set Theory! (Review how to formalize sets and what not)

end hidden
